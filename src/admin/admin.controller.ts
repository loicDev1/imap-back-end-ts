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
import { AdminService } from './admin.service';
import { User } from 'src/user/entities/User.entity';
import { CreateUserDTO } from 'src/user/dto/CreateUserDTO';
import { UpdateUserRoleDTO } from './dto/UpdateUserRoleDTO';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getUsers(@Query('token') userToekname: string) {
    return this.adminService.getUsers(userToekname);
  }

  @Patch('blockedUser/:id')
  async blockUser(
    @Param('id', ParseIntPipe) userId: number,
    @Query('token') userToken: string,
  ): Promise<any> {
    return this.adminService.blockUser(userToken, userId);
  }

  @Post('registerUser')
  async registerUser(
    @Body() createUserDTO: CreateUserDTO,
    @Query('token') userToken: string,
    @Req() Request: any,
  ) {
    return this.adminService.registerUser(userToken, createUserDTO, Request);
  }

  @Patch('updateUser')
  async updateUser(@Body() updateUserRole: UpdateUserRoleDTO) {
    return this.adminService.updateUserRole(updateUserRole);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }
}
