import { Controller, Get } from '@nestjs/common';
import { Commit } from 'git-last-commit';

import { getLastCommit } from '~/utils';

import { HelloService } from './hello.service';

@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }

  @Get('version')
  async getVersion(): Promise<{ version: string }> {
    return {
      version: process.env.npm_package_version!,
    };
  }

  @Get('last-commit')
  async getLastCommit(): Promise<Pick<Commit, 'hash' | 'shortHash'>> {
    const lastCommit = await getLastCommit();
    return {
      hash: lastCommit.hash,
      shortHash: lastCommit.shortHash,
    };
  }
}
