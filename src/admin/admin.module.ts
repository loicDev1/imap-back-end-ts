import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from 'src/user/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Admin } from './entities/Admin.entities';
import { DiagnosticModule } from 'src/diagnostic/diagnostic.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule , DiagnosticModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
