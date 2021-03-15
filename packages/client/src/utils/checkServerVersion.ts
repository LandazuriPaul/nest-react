import satisfies from 'semver/functions/satisfies';

import { API_URL } from '~/config';

import { Logger } from './logger';

function isServerVersionSatisfying(serverVersion: string): boolean {
  return satisfies(serverVersion, __REQUIRED_SERVER_VERSION__);
}

export async function checkServerVersion(): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/version`);
    const { SERVER_VERSION: serverVersion } = await res.json();
    if (!isServerVersionSatisfying(serverVersion)) {
      Logger.error(
        `Server version ${serverVersion} does NOT satisfy client's peer dependency: ${__REQUIRED_SERVER_VERSION__}`
      );
    }
  } catch (err) {
    Logger.error(err);
  }
}
