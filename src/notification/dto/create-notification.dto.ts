import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDTO {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  sender: any;

  @IsNotEmpty()
  receiver: any;
}
