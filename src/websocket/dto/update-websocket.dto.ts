import { PartialType } from '@nestjs/mapped-types';
import { CreateWsNotificationDto } from './create-websocket.dto';

export class UpdateWebsocketDto extends PartialType(CreateWsNotificationDto) {
  id: number;
}
