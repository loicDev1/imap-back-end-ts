import { Test, TestingModule } from '@nestjs/testing';
import { MaintenancierService } from './maintenancier.service';

describe('MaintenancierService', () => {
  let service: MaintenancierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenancierService],
    }).compile();

    service = module.get<MaintenancierService>(MaintenancierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
