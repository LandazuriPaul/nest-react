import { join } from 'path';
import { readFileSync } from 'fs';
import { Injectable, Logger } from '@nestjs/common';

import { Dictionary } from '@nest-react/domain';

import { ConfigService } from '~/modules/config/config.service';

@Injectable()
export class StatusService {
  private logger = new Logger(StatusService.name);
  private version: string;

  constructor(private readonly configService: ConfigService) {
    this.version = readFileSync(
      join(configService.rootDir, '..', '..', 'VERSION')
    ).toString();
  }

  getStatus(): string {
    this.logger.log('log from statusService.getStatus()');
    return `Status world from Nest running on ${this.configService.host}:${this.configService.port}!`;
  }

  getVersion(): Dictionary<string> {
    return this.version.split(/[\r\n]+/).reduce((agg, line) => {
      const [key, value] = line.split('=');
      agg[key] = value;
      return agg;
    }, {} as Dictionary<string>);
  }
}
