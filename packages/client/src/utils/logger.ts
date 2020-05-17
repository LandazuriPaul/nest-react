/* eslint-disable @typescript-eslint/ban-ts-ignore */
import debug from 'debug';

import { LOGGER_PREFIX } from '~/config';

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
  // @ts-ignore:Rest parameter 'args' implicitly has an 'any[]' type
  static info(...args): void {
    return debugInfo(args);
  }

  // @ts-ignore:Rest parameter 'args' implicitly has an 'any[]' type
  static log(...args): void {
    return debugInfo(args);
  }

  // @ts-ignore:Rest parameter 'args' implicitly has an 'any[]' type
  static warn(...args): void {
    return debugWarn(args);
  }

  // @ts-ignore:Rest parameter 'args' implicitly has an 'any[]' type
  static error(...args): void {
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