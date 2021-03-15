import { resolve } from 'path';
import { promisify } from 'util';
import { ResolvedConfig, UserConfigExport, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { Commit, getLastCommit as gitLastCommit } from 'git-last-commit';

import { peerDependencies } from './package.json';

const getLastCommitPromise = promisify(gitLastCommit);

async function getLastCommit(): Promise<Commit> {
  return getLastCommitPromise();
}

const DEV_SERVER_PORT = 8000;

// Commit information to identify the build
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getBuildId(): Promise<any> {
  try {
    const lastCommit = await getLastCommit();
    if (lastCommit.branch !== 'master') {
      return `${lastCommit.shortHash}@${lastCommit.branch}`;
    }
    return lastCommit.shortHash;
  } catch (err) {
    console.log(err);
    return 'no-git';
  }
}

const BUILD_ID = await getBuildId();

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
        '~': resolve(__dirname, 'src'),
      },
    },
    plugins: [reactRefresh()],
  });

  if (command === 'serve') {
    return {
      ...baseConfig,
      server: {
        port: DEV_SERVER_PORT,
      },
    };
  }

  return {
    ...baseConfig,
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          // file: `dist.js`,
          file: `dist.${BUILD_ID}.[hash].js`,
        },
      },
    },
  };
};
