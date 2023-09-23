import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDTO {
  @IsNotEmpty()
  sender: any;

  @IsNotEmpty()
  receiver: any;

  @IsNotEmpty()
  intervention: any;
}
