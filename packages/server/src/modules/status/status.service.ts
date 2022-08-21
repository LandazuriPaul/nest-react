import { join } from 'path';
import { readFileSync } from 'fs';
import { Injectable, Logger } from '@nestjs/common';

import { Dictionary } from '@nest-react/domain';

import { ConfigService } from '~/modules/config/config.service';

@Injectable()
export class StatusService {
  private logger = new Logger(StatusService.name);
  private version: Dictionary<string>;

  constructor(private readonly configService: ConfigService) {
    this.version = readFileSync(
      join(configService.rootDir, '..', '..', 'VERSION')
    )
      .toString()
      .split(/[\r\n]+/)
      .reduce((agg, line) => {
        const [key, value] = line.split('=');

        // The client is served from another Docker image
        // thus, this one isn't necessarily correct
        if (key !== 'CLIENT_VERSION') {
          agg[key] = value;
        }
        return agg;
      }, {} as Dictionary<string>);
  }

  getStatus(): string {
    this.logger.log('log from statusService.getStatus()');
    return `Hello world from Nest running on ${this.configService.host}:${this.configService.port}!`;
  }

  getVersion(): Dictionary<string> {
    return this.version;
  }
}
