import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nom: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'la taille maximale est de 50 caracteres',
  })
  prenom: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
  })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmpty()
  role: string;
}
