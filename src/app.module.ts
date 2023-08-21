import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PersonnelModule } from './personnel/personnel.module';
import { MaintenancierModule } from './maintenancier/maintenancier.module';
import { InterventionModule } from './intervention/intervention.module';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtudiantModule } from './etudiant/etudiant.module';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AdminModule,
    PersonnelModule,
    MaintenancierModule,
    InterventionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EtudiantModule,
    FirebaseModule,
    // FirebaseModule.forRoot({
    //   googleApplicationCredential: ''
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
