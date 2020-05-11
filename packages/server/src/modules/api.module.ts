import { Module } from '@nestjs/common';

import { ConfigModule } from '~/config/config.module';

import { HelloModule } from './hello/hello.module';

@Module({
  imports: [ConfigModule, HelloModule],
})
export class APIModule {}
