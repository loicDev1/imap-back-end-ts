import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { CreateWsNotificationDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { NotificationService } from 'src/notification/notification.service';
import { WebSocketServer } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class WebsocketService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
  ) {}

  // @WebSocketServer()
  // server: Server;

  async notifyIntervention(
    payload: CreateWsNotificationDto,
    server: Server,
    clientSocket: Socket,
  ) {
    try {
      const result = await this.notificationService.sendNotification(payload);
      server.emit('notifyIntervention', {...payload, ...result});
      return result;
      // envoi du mail a l'admin via firebaseService...
      // this.authService.sendEmailWithNodeMailer(
      //   'loic.mboulefack@institutsaintjean.org',
      //   '<h1> Hello Loic dev</h1>',
      //   'mboulefacklekaneloic@gmail.com',
      // );
    } catch (error) {
      console.log(error);
    }
  }

  async notifyDiagnostic(
    payload: CreateWsNotificationDto,
    server: Server,
    clientSocket: Socket,
  ) {
    try {
      const result = await this.notificationService.sendNotification(payload);
      server.emit('notifyDiagnostic', {...payload, ...result});
      return result;
      // envoi du mail a l'admin via firebaseService...
      // this.authService.sendEmailWithNodeMailer(
      //   'loic.mboulefack@institutsaintjean.org',
      //   '<h1> Hello Loic dev</h1>',
      //   'mboulefacklekaneloic@gmail.com',
      // );
    } catch (error) {
      console.log(error);
    }
  }
}
