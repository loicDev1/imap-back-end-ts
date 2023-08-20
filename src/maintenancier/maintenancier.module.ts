import { Module } from '@nestjs/common';
import { MaintenancierController } from './maintenancier.controller';
import { MaintenancierService } from './maintenancier.service';

@Module({
  controllers: [MaintenancierController],
  providers: [MaintenancierService]
})
export class MaintenancierModule {}
