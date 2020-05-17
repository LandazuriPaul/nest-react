import { Controller, Get } from '@nestjs/common';

import { getLastCommit } from '~/utils';

import { HelloService } from './hello.service';

@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }

  @Get('/version')
  async getVersion(): Promise<{ commit: string }> {
    const lastCommit = await getLastCommit();
    return {
      commit: lastCommit.shortHash,
    };
  }
}
