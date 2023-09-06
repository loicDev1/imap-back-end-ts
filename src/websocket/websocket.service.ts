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
      await this.notificationService.sendNotification(payload);
      server.emit('notifyIntervention', payload.content);
      // envoi du mail a l'admin via firebaseService...
      this.authService.sendEmailWithNodeMailer(
        'loic.mboulefack@institutsaintjean.org',
        '<h1> Hello Loic dev</h1>',
        'mboulefacklekaneloic@gmail.com',
      );
    } catch (error) {
      console.log(error);
    }
  }
}
