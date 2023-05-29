import mqtt from 'mqtt/dist/mqtt';

import { LevelString, log } from '../../../helpers/logger';

import { defaultCredentials } from '../authentication';

export interface BrokerConnectionInfo {
  readonly protocol: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly locale: string;
  readonly frameMax: number;
  readonly heartbeat: number;
  readonly vhost: string;
  readonly clientId: string;
}
// As an alternative to connectionString, we can pass an object to connect() with all parameters
export function connectionInfo(
  clientId = `IMSCC`,
  credentials = defaultCredentials.rmq,
  host = '127.0.0.1',
  port = 15675, // 15675 is default websocket plugin for mqtt // 1883,
  vhost = '/'
  // query: string, // TODO: what do we need the query parameters for, if anything?
): BrokerConnectionInfo {
  return {
    frameMax: 0,
    heartbeat: 0,
    host,
    locale: 'en_US',
    password: credentials.password,
    port,
    protocol: 'mqtt', // 'amqp',
    username: credentials.username,
    vhost,
    clientId,
  };
}

// TODO: return data from store. currently returns default information
// Should this be asynchronous?
export function storedConnectionInfo(): BrokerConnectionInfo {
  return connectionInfo();
}

export class BrokerConnection {
  protected client;

  protected topic: string | string[];

  // TODO: remove default topic = 'test-binding'
  constructor(info: BrokerConnectionInfo, topic: string | string[]) {
    this.topic = topic;
    this.client = mqtt.connect(`mqtt://${info.host}:${info.port}/ws`, {
      keepalive: 30,
      password: info.password,
      username: info.username,
      clientId: info.clientId,
    });
  }

  setHandlers(
    messageHandler: (topic: string, payload: Buffer, packet: unknown) => void
  ) {
    // connection
    this.client.on('connect', () => {
      log(LevelString.INFO, 'mqtt connected');

      this.client.subscribe(this.topic, (err) => {
        if (!err) {
          log(LevelString.INFO, 'subscription successful');
          // this.testPublish();
        } else
          log(LevelString.ERROR, 'Error subscribing to topic via mqtt', err);
      });
    });

    // on message
    this.client.on('message', (topic, payload, packet) => {
      messageHandler(topic, payload, packet);
    });

    // close
    this.client.on('end', () => {
      log(LevelString.INFO, 'mqtt connection closed');
    });
  }

  testPublish() {
    this.client.publish('chpida/ims/datacatalog', 'mqtt test message');
  }
}
