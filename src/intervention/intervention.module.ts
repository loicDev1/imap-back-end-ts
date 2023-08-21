import { Module } from '@nestjs/common';
import { InterventionController } from './intervention.controller';
import { InterventionService } from './intervention.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './entities/Intervention.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Intervention])],
  controllers: [InterventionController],
  providers: [InterventionService]
})
export class InterventionModule {}
