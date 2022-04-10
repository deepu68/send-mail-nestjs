import { Test, TestingModule } from '@nestjs/testing';
import { CrudAppController } from '../src/v1/crud-app/crud-app.controller';
import { CrudAppService } from '../src/v1/crud-app/crud-app.service';

describe('AppController', () => {
  let crudAppController: CrudAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CrudAppController],
      providers: [CrudAppService],
    }).compile();

    crudAppController = app.get<CrudAppController>(CrudAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(crudAppController.getHello()).toBe('Hello World!');
    });
  });
});
