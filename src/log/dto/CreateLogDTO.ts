import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLogDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  typeOperation: string;
}
