/* eslint-disable no-console */
const { readFileSync } = require('fs');
const { join } = require('path');

let packagePath;

switch (process.argv.slice(2)[0]) {
  case 'client':
    packagePath = join(__dirname, '..', 'packages', 'client');
    break;
  case 'domain':
    packagePath = join(__dirname, '..', 'packages', 'domain');
    break;
  case 'lib':
    packagePath = join(__dirname, '..', 'packages', 'lib');
    break;
  case 'server':
    packagePath = join(__dirname, '..', 'packages', 'server');
    break;
  case 'repo':
  default:
    packagePath = join(__dirname, '..');
    break;
}

const { version } = JSON.parse(readFileSync(join(packagePath, 'package.json')));

console.log(version);
