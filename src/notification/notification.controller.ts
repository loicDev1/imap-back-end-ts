import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDTO } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('notification/:id')
  async getNotificationById(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.getNotificationById(id);
  }

  @Get('notificationsByUser')
  async getNotificationsByUser(@Query('token') userToken: string) {
    return this.notificationService.getNotificationsByUser(userToken);
  }

  @Get('notifications')
  async getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }
}
