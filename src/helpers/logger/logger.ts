import { ConsoleFormattedStream } from '@browser-bunyan/console-formatted-stream';
import { createLogger, stdSerializers } from 'browser-bunyan';

/*
debug (20): Anything else, i.e. too verbose to be included in "info" level.
error (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
fatal (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
info (30): Detail on regular operation.
trace (10): Logging from external libraries used by your app or very detailed application logging.
warn (40): A note on something that should probably be looked at by an operator eventually.
*/

export enum LevelString {
  DEBUG = 'debug',
  ERROR = 'error',
  FATAL = 'fatal',
  INFO = 'info',
  TRACE = 'trace',
  WARN = 'warn',
}

type LogLevelString =
  | LevelString.DEBUG
  | LevelString.ERROR
  | LevelString.FATAL
  | LevelString.INFO
  | LevelString.TRACE
  | LevelString.WARN;

export const log = (
  level: LogLevelString,
  msg: string,
  data?: unknown
): void => {
  const logger = createLogger({
    name: 'CHP-IDA',
    serializers: stdSerializers,
    streams: [
      {
        level,
        stream: new ConsoleFormattedStream(),
      },
    ],
  });
  return data ? logger[level](data, `<= ${msg}`) : logger[level](msg);
};
