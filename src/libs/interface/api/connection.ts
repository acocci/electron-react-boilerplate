import {
  context,
  propagation,
  Span,
  SpanContext,
  SpanKind,
  SpanStatusCode,
  trace,
} from '@opentelemetry/api';
import {
  createContextKey,
  ROOT_CONTEXT,
} from '@opentelemetry/api/build/src/context/context';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { Resource } from '@opentelemetry/resources';
import {
  BasicTracerProvider,
  BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { StackContextManager } from '@opentelemetry/sdk-trace-web';
/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';

import { LevelString, log } from '../../../helpers/logger';

import { BrokerConnection, BrokerConnectionInfo } from './broker-connection';
import { MessageHandler } from './message-handlers';

// Create and register an SDK
// for usage, see https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/tracing.md
propagation.setGlobalPropagator(new W3CTraceContextPropagator());
const provider = new BasicTracerProvider({
  resource: new Resource({ 'service.name': 'IMSCC' }),
});
const contextManager = new StackContextManager();
contextManager.enable();
if (!context.setGlobalContextManager(contextManager))
  log(LevelString.ERROR, `Failed to register global context manager`);
// provider.register({ contextManager });
// TODO: exporter needs to be registered with optional config.
const options = {
  serviceName: 'imscc',
  headers: {
    'Content-Type': 'application/json',
  },
  url: 'http://localhost:9411/api/v2/spans',
};
provider.addSpanProcessor(new BatchSpanProcessor(new ZipkinExporter(options)));
trace.setGlobalTracerProvider(provider);

// Acquire a tracer from the global tracer provider which will be used to trace the application
const name = 'imscc';
const version = '0.1.0';
const tracer = trace.getTracer(name, version);

// if it makes sense, we can move the CMD enum to data.ts
export enum AgentCMD {
  ListAvailableDevices = 'CHPIDA.IMS.LISTAVAILABLEDEVICES',
  ListConnectedDevices = 'CHPIDA.IMS.LISTCONNECTEDDEVICES',
  SelectDevice = 'CHPIDA.IMS.SELECTDEVICE',
  SetCharacteristics = 'CHPIDA.IMS.SETCHARACTERISTICS',
  SetNotifications = 'CHPIDA.IMS.SETNOTIFICATIONS',
  DisconnectDevice = 'CHPIDA.IMS.DISCONNECTDEVICE',
}

interface CMDMeta {
  sent: Date;
  handler: null | MessageHandler;
  span: Span;
}

// https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
function constructTraceParent(ctx: SpanContext) {
  return `00-${ctx.traceId}-${ctx.spanId}-0${ctx.traceFlags}`;
}

export class ApiConnection extends BrokerConnection {
  // internal state
  awaitingResults: Record<string, CMDMeta> = {};

  private static _instance: ApiConnection;

  private _statusHandler: MessageHandler;

  private _catalogHandler: MessageHandler;

  // TODO: should we bundle msg handlers on init with predicates to determine whether to use them?
  // if predicate functions overlap it could cause unintended behavior, but that approach gives us flexibility
  constructor(
    info: BrokerConnectionInfo,
    statusMessageHandler: MessageHandler,
    dataCatalogMessageHandler: MessageHandler,
    topic: string | string[] = ['chpida.ims.datacatalog', 'chpida.ims.status']
  ) {
    super(info, topic);
    this._statusHandler = statusMessageHandler;
    this._catalogHandler = dataCatalogMessageHandler;
    this.setHandlers(this.onMessage);
  }

  public static getInstance(
    info: BrokerConnectionInfo,
    statusMessageHandler: MessageHandler,
    dataCatalogMessageHandler: MessageHandler,
    topic: string | string[] = ['chpida.ims.datacatalog', 'chpida.ims.status']
  ) {
    // Do you need arguments? Make it a regular static method instead.
    if (this._instance) return this._instance;
    this._instance = new this(
      info,
      statusMessageHandler,
      dataCatalogMessageHandler,
      topic
    );
    return this._instance;
  }

  // send commands to the agent such as devive list commands, disconnect commands and connect commands
  sendCMD(
    cmd: AgentCMD,
    agentid: string,
    params: Record<string, unknown>,
    messageHandler: null | MessageHandler = null
  ) {
    // generate correlationid for use as Context
    const correlationid = uuidv4();
    const correlationSymbol = createContextKey('correlationid');
    const cmdContext = ROOT_CONTEXT.setValue(correlationSymbol, correlationid);
    log(
      LevelString.INFO,
      `Corr id: ${correlationid}, Symbol: ${correlationSymbol.toString()}, cmdContext: ${cmdContext.getValue(
        correlationSymbol
      )}`
    );

    context.with(cmdContext, () => {
      // Start span
      const span = tracer.startSpan(
        `RPC: ${cmd}`,
        { kind: SpanKind.PRODUCER },
        cmdContext
      );
      span.setAttributes({
        'rpc.system': 'INGESTION-AGENT',
        'net.peer.name': 'localhost',
      });
      log(LevelString.INFO, `Starting RPC span`, span);
      const resultkey = this.resultKey(correlationid);
      const now = new Date();
      params.context = {
        traceparent: constructTraceParent(span.spanContext()),
      };
      // create msg
      const msg = {
        agentId: agentid,
        cmd,
        correlationid,
        params,
        reply_to: resultkey.replaceAll('/', '.'),
        timestamp: now.toISOString(), // routing key to subscription
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.client.subscribe(resultkey, { qos: 0 }, (err, _granted) => {
        if (err)
          log(
            LevelString.ERROR,
            `Error subscribing to result topic for id ${correlationid}`,
            err
          );
        else if (!(correlationid in this.awaitingResults))
          this.awaitingResults[correlationid] = {
            sent: now,
            handler: messageHandler,
            span,
          };
      });
      this.client.publish(
        `chpida/ims/${agentid}/cmd`,
        JSON.stringify(msg),
        (error) => {
          span.addEvent('Published command');
          if (error) {
            log(
              LevelString.ERROR,
              `Failed to publish command ${cmd} to agent ${agentid}`,
              error
            );
            if (span) {
              log(LevelString.ERROR, `Error publishing cmd, closing RPC span`);
              span.end();
            } else {
              log(
                LevelString.ERROR,
                `Cannot see span from inside publish, need to modify code`
              );
            }
          }
        }
      );
    });
  }

  // eslint-disable-next-line class-methods-use-this
  resultKey(id: string) {
    return `chpida/ims/${id}/result`;
  }

  // result msg structure
  // {
  //   agentid: string,
  //   timestamp: datetime,
  //   correlationid: string,
  //   result: {
  //     <json formatted result>
  //   }
  // }
  // topic is useless, it refers to the autogenerated mqtt queue name, not the routing key of the msg
  onMessage: MessageHandler = (
    _topic: string,
    payload: Buffer,
    _packet: unknown
  ) => {
    log(LevelString.INFO, `${payload.toString()}`, 'Message received');
    const prepped = payload.toString().replaceAll("'", '"');
    const msg: {
      correlationid?: string; // cmd response
      connectionstate?: string; // device status
      agentId?: string; // data catalog
    } = JSON.parse(prepped);

    // if message is a command result we're waiting for
    if (msg.correlationid && msg.correlationid in this.awaitingResults) {
      const awaitObj = this.awaitingResults[msg.correlationid];

      if (awaitObj.handler != null) {
        log(LevelString.INFO, 'Executing result handler');
        awaitObj.handler(_topic, payload, _packet);
      } else {
        log(LevelString.INFO, `No handler for result`);
      }

      // End RPC span // TODO: should this be ended inside unsubscribe instead?
      awaitObj.span.addEvent('Response received');
      awaitObj.span.setStatus({ code: SpanStatusCode.OK });
      awaitObj.span.end();

      // remove correlation id from list of awaiting results
      delete this.awaitingResults[msg.correlationid];
      this.client.unsubscribe(
        this.resultKey(msg.correlationid),
        undefined,
        (err) => {
          if (err)
            log(
              LevelString.ERROR,
              `Error unsubscribing from result topic ${this.resultKey(
                msg.correlationid || ''
              )}`,
              err
            );
          else
            log(
              LevelString.INFO,
              `Removed correlation id from awaitingResults: ${msg.correlationid}`
            );
        }
      );
    }
    // if msg is status
    if (msg.connectionstate) {
      this._statusHandler(_topic, payload, _packet);
    }
    // if msg is datacatalog
    if (msg.agentId) {
      this._catalogHandler(_topic, payload, _packet);
    }
  };
}
