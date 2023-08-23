import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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


  @Get()
  getUsers() {}

  @Get(':id')
  getUserById(@Param('id') id) {}

  @Patch(':id')
  async updateUser(
    @Param('id' , ParseIntPipe) id: number,
    @Body() updateUser: Partial<CreateUserDTO>,
  ) {}

  @Delete(':id')
  async deleteUser(@Param('id' , ParseIntPipe) id : number) {}

}
