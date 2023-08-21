import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/UserLoginDTO';
import { CreateUserDTO } from 'src/user/dto/CreateUserDTO';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUserDTO : CreateUserDTO) {
    return this.authService.register(createUserDTO)
  }

  @Post('/login')
  async login(@Body() userLoginDTO: UserLoginDTO) {}
}
