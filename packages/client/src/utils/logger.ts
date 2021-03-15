import debug from 'debug';

const LOGGER_PREFIX = 'nest-react';

const debugInfo = debug(`${LOGGER_PREFIX}:info`);
debugInfo.enabled = true;
debugInfo.color = '#01c205';

const debugWarn = debug(`${LOGGER_PREFIX}:warn`);
debugWarn.enabled = true;
debugWarn.color = '#ccc310';

const debugError = debug(`${LOGGER_PREFIX}:error`);
debugError.enabled = true;
debugError.color = '#b01405';

export class Logger {
  static info(...args: unknown[]): void {
    return debugInfo(args);
  }

  static log(...args: unknown[]): void {
    return debugInfo(args);
  }

  static warn(...args: unknown[]): void {
    return debugWarn(args);
  }

  static error(...args: unknown[]): void {
    if (args && args.length > 0 && args[0] instanceof Error) {
      const [e, ...rest] = args;
      let message = e.toString();
      if (e.stack) {
        message = `${message}\n__Stack trace__\n\n${e.stack}`;
      }
      return debugError(message, rest.length > 0 ? rest : undefined);
    }
    return debugError(args);
  }
}
