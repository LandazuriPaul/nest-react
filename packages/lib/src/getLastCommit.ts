import { promisify } from 'util';

import { Commit, getLastCommit as gitLastCommit } from 'git-last-commit';

const getLastCommitPromise = promisify(gitLastCommit);

export async function getLastCommit(): Promise<Commit> {
  return getLastCommitPromise();
}
