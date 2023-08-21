import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports : [UserModule , FirebaseModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
