import { satisfies } from 'semver';

import { API_URL, LOGGER_PREFIX } from '~/config';

import { Logger } from './logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let peerDependencies: any;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  peerDependencies = require('~/../package.json').peerDependencies;
} else {
  // TODO: webpack constant
  // peerDependencies = __REQUIRED_SERVER_VERSION__;
}

function requiredServerVersion(): string {
  return peerDependencies[`@${LOGGER_PREFIX}/server`] as string;
}

function isServerVersionSatisfying(serverVersion: string): boolean {
  return satisfies(serverVersion, requiredServerVersion());
}

export async function checkServerVersion(): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/version`);
    const { version: serverVersion } = await res.json();
    if (!isServerVersionSatisfying(serverVersion)) {
      Logger.error(
        `Server version ${serverVersion} does NOT satisfy client's peer dependency: ${requiredServerVersion()}`
      );
    }
  } catch (err) {
    Logger.error(err);
  }
}
