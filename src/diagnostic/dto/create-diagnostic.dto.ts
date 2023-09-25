import { IsNotEmpty, IsString } from 'class-validator';
import { CreateResourceDto } from 'src/resource/dto/create-resource.dto';

export class CreateDiagnosticDto {
  @IsNotEmpty()
  @IsString()
  problematique: string;

  @IsNotEmpty()
  @IsString()
  analyse: string;

  @IsNotEmpty()
  @IsString()
  perspective: string;

  @IsNotEmpty()
  materiel: CreateResourceDto[];

  @IsNotEmpty()
  imateriel: CreateResourceDto[];

  @IsNotEmpty()
  humain: CreateResourceDto[];
}
