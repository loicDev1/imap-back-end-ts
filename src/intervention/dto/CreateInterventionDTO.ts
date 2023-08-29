import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateInterventionDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(70)
    titre: string;

    @IsString()
    @IsNotEmpty()
    description: string;
  
}