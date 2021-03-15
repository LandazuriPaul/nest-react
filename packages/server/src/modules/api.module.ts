import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [ConfigModule, StatusModule],
})
export class APIModule {}
