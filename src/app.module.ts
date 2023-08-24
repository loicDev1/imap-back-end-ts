import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PersonnelModule } from './personnel/personnel.module';
import { MaintenancierModule } from './maintenancier/maintenancier.module';
import { InterventionModule } from './intervention/intervention.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtudiantModule } from './etudiant/etudiant.module';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';
import { MiddlewareVerifyTokenMiddleware } from './middleware/middleware.verify-token/middleware.verify-token.middleware';
import { VerifyAdminRoleMiddleware } from './middleware/verify-admin-role/verify-admin-role.middleware';
import { VerifyEtudiantRoleMiddleware } from './middleware/verify-etudiant-role/verify-etudiant-role.middleware';
import { VerifyMaintenancierRoleMiddleware } from './middleware/verify-maintenancier-role/verify-maintenancier-role.middleware';
import { IsBlockedUserMiddleware } from './middleware/is-blocked-user/is-blocked-user.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(MiddlewareVerifyTokenMiddleware)
      .exclude(
        { path: 'api/user/auth/register', method: RequestMethod.ALL },
        { path: 'api/user/auth/login', method: RequestMethod.ALL },
      )
      .forRoutes('')
      // .apply(IsBlockedUserMiddleware)
      // .exclude({ path: 'api/user/auth/register', method: RequestMethod.ALL })
      // .forRoutes('')
      .apply(VerifyAdminRoleMiddleware)
      .forRoutes('api/admin*')
      .apply(VerifyEtudiantRoleMiddleware)
      .forRoutes('api/etudiant*')
      .apply(VerifyMaintenancierRoleMiddleware)
      .forRoutes('api/maintenancier*');
  }
}
