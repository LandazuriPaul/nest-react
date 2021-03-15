import { Controller, Get } from '@nestjs/common';

import { Dictionary } from '@nest-react/domain';

import { StatusService } from './status.service';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getStatus(): string {
    return this.statusService.getStatus();
  }

  @Get('version')
  getVersion(): Dictionary<string> {
    return this.statusService.getVersion();
  }
}
