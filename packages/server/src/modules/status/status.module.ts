import { Module } from '@nestjs/common';

import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
