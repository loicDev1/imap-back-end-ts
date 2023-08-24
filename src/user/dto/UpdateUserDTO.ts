import { IsNotEmpty } from 'class-validator';
import { User } from '../entities/User.entity';

export class UpdateUserDTO {
  @IsNotEmpty()
  id: number;
}
