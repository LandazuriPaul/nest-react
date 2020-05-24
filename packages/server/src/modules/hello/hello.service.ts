import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '~/modules/config/config.service';

@Injectable()
export class HelloService {
  private logger = new Logger(HelloService.name);

  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    this.logger.log('log from helloService.getHello()');
    return `Hello world from Nest running on ${this.configService.host}:${this.configService.port}!`;
  }
}
