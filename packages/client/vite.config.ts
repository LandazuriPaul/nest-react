import { join } from 'path';
import { readFileSync } from 'fs';
import { ResolvedConfig, UserConfigExport, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { peerDependencies } from './package.json';

const DEV_SERVER_PORT = 8000;

// Commit information to identify the build
function getBuildId(): string {
  try {
    const versionPath = join(__dirname, '..', '..', 'VERSION');
    const versionData = readFileSync(versionPath)
      .toString()
      .split(/[\r\n]+/);
    const [, branch] = versionData
      .find(line => line.includes('GIT_BRANCH'))!
      .split('=');
    const [, shortHash] = versionData
      .find(line => line.includes('GIT_SHORT_HASH'))!
      .split('=');
    return `${shortHash}@${branch}`;
  } catch (err) {
    console.log(err);
    return 'no-git';
  }
}

// https://vitejs.dev/config/
export default ({
  command,
}: Pick<ResolvedConfig, 'command' | 'mode'>): UserConfigExport => {
  const baseConfig = defineConfig({
    define: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __REQUIRED_SERVER_VERSION__: `'${peerDependencies['@nest-react/server']}'`,
    },
    resolve: {
      alias: {
        '~': join(__dirname, 'src'),
      },
    },
    plugins: [react()],
  });

  if (command === 'serve') {
    return {
      ...baseConfig,
      server: {
        port: DEV_SERVER_PORT,
      },
    };
  }

  const assetsDir = 'assets';

  return {
    ...baseConfig,
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          entryFileNames: join(assetsDir, `[name].${getBuildId()}.[hash].js`),
        },
      },
    },
  };
};
