import { Test, TestingModule } from '@nestjs/testing';
import { MaintenancierController } from './maintenancier.controller';

describe('MaintenancierController', () => {
  let controller: MaintenancierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenancierController],
    }).compile();

    controller = module.get<MaintenancierController>(MaintenancierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
