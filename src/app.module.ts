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
import { InterventionModule } from './intervention/intervention.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';
import { MiddlewareVerifyTokenMiddleware } from './middleware/middleware.verify-token/middleware.verify-token.middleware';
import { VerifyAdminRoleMiddleware } from './middleware/verify-admin-role/verify-admin-role.middleware';
import { IsBlockedUserMiddleware as IsBlockedOrUnverifiedEmailMiddleware } from './middleware/is-blocked-user/is-blocked-user.middleware';
import { LogModule } from './log/log.module';
import { VerifyPersonnelRoleMiddleware } from './middleware/verify-personnel-role/verify-personnel-role.middleware';
import { Log } from './log/entities/log.entity';
import { NotificationModule } from './notification/notification.module';
import { InsertLogMiddleware } from './middleware/insert-log/insert-log.middleware';
import { WebsocketModule } from './websocket/websocket.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    AdminModule,
    PersonnelModule,
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
    FirebaseModule,
    LogModule,
    NotificationModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(
        MiddlewareVerifyTokenMiddleware,
        IsBlockedOrUnverifiedEmailMiddleware,
      )
      .exclude(
        { path: 'user/auth/register', method: RequestMethod.ALL },
        { path: 'user/auth/login', method: RequestMethod.ALL },
        { path: 'user/resetPassword', method: RequestMethod.ALL },
      )
      .forRoutes('')
      .apply(VerifyAdminRoleMiddleware)
      .forRoutes({ path: 'admin*', method: RequestMethod.ALL })
      .apply(VerifyPersonnelRoleMiddleware)
      .forRoutes(
        { path: 'personnel*', method: RequestMethod.ALL },
        { path: 'intervention*', method: RequestMethod.ALL },
      )
      .apply(InsertLogMiddleware)
      .forRoutes('');
  }
}
