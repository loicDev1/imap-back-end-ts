import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
