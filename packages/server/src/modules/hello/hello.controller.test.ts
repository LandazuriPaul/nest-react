import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '~/modules/config/config.service';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

describe('AppController', () => {
  let helloController: HelloController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [ConfigService, HelloService],
    }).compile();

    helloController = app.get<HelloController>(HelloController);
  });

  describe('root', () => {
    it('should return a nice hello world', () => {
      expect(helloController.getHello()).toBe(
        'Hello world from Nest running on localhost:4000!'
      );
    });
  });
});
