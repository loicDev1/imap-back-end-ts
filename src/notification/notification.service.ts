import { Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notifRepository: Repository<Notification>,
  ) {}

  sendNotification(content: string, senderId: string, receiverId: number) {
    return 'This action adds a new notification';
  }

  async getNotificationById(id: number): Promise<Notification | null> {
    try {
      return await this.notifRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
    }
  }

  async getNotificationsByUser(
    userToken: string,
  ): Promise<Notification | Notification[]> {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      const { id: receiver } = await result.data;
      return await this.notifRepository.findBy({ receiver });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllNotifications(): Promise<Notification[]> {
    try {
      return await this.notifRepository.find();
    } catch (error) {
      console.log(error);
    }
  }
}
