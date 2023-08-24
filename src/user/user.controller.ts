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

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  async register(@Body() createUserDTO : CreateUserDTO) {
    return this.userService.register(createUserDTO)
  }

  @Post('auth/login')
  async login(@Body() credentials: UserLoginDTO) {
    return this.userService.login(credentials)
  }


  @Get('profile')
  getUserProfile(@Query('token') userToken : string) {
    return this.userService.getUserProfile(userToken);
  }


  @Patch(':id')
  async updateUser(
    @Param('id' , ParseIntPipe) id: number,
    @Body() updateUser: Partial<CreateUserDTO>,
  ) {}

  @Delete(':id')
  async deleteUser(@Param('id' , ParseIntPipe) id : number) {}

}
