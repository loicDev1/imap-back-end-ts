import { IsNotEmpty, IsString, IsEmpty } from 'class-validator';

type ResourceType = 'materiel' | 'imateriel' | 'humain';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsString()
  type: ResourceType;

  @IsEmpty()
  diagnostic: any
}
