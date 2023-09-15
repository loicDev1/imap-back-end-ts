import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { UpdateNotificationDTO } from './dto/update-notification.dto';

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
  
  @Patch('updateNotifStatus/:id')
  async updateReadNotif(@Param('id') id ) {
    return this.notificationService.updateReadNotif(id);
  }

  @Get('notifications')
  async getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }
}
