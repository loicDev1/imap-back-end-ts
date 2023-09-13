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
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UserLoginDTO } from './dto/UserLoginDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  async register(@Body() createUserDTO: CreateUserDTO, @Req() Request) {
    return this.userService.register(createUserDTO, Request);
  }

  @Post('auth/login')
  async login(@Body() credentials: UserLoginDTO, @Req() Request) {
    return this.userService.login(credentials, Request);
  }

  @Get('profile')
  getUserProfile(@Query('token') userToken: string) {
    return this.userService.getUserProfile(userToken);
  }

  @Get('logs')
  getLogs(@Query('token') userToken: string) {
    return this.userService.getLogs();
  }

  @Patch('update')
  async updateUser(@Body() updateUser: UpdateUserDTO) {
    return this.userService.updateUser(updateUser);
  }

  @Post('resetPassword')
  async resetPassword(
    @Body('email') email: string,
    //@Query('token') token,
    @Req() Request : any,
  ) {
    return this.userService.ResetPasswordByEmail(email, Request, /*token*/);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {}
}
