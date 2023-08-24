import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UserLoginDTO } from './dto/UserLoginDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.register(createUserDTO);
  }

  @Post('auth/login')
  async login(@Body() credentials: UserLoginDTO) {
    return this.userService.login(credentials);
  }

  @Get('profile')
  getUserProfile(@Query('token') userToken: string) {
    return this.userService.getUserProfile(userToken);
  }

  @Patch('update')
  async updateUser(@Body() updateUser: UpdateUserDTO) {
    return this.userService.updateUser(updateUser);
  }

  @Post('resetPassword')
  async resetPassword(@Body('email') email: string) {
    return this.userService.ResetPasswordByEmail(email);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {}
}
