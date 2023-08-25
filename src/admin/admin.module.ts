import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from 'src/user/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Admin } from './entities/Admin.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
