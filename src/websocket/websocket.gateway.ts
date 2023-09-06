import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WebsocketService } from './websocket.service';
import { CreateWsNotificationDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  constructor(private readonly websocketService: WebsocketService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(clientSocket: Socket) {
    console.log(`client connected: ${clientSocket.id}`);
  }

  handleDisconnect(clientSocket: Socket) {
    console.log(`client disconnected : ${clientSocket.id}`);
  }

  @SubscribeMessage('notifyIntervention')
  notifyIntervention(
    @MessageBody() payload: CreateWsNotificationDto,
    @ConnectedSocket() clientSocket: Socket,
  ) {
    this.websocketService.notifyIntervention(
      payload,
      this.server,
      clientSocket,
    );
  }
}
