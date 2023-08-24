import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from 'src/user/entities/User.entity';
import { CreateUserDTO } from 'src/user/dto/CreateUserDTO';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getUsers(@Query('token') userToekname: string) {
    return this.adminService.getUsers(userToekname);
  }

  @Patch('blockedUser/:id')
  async blockUser(
    @Param('id' , ParseIntPipe) userId : number,
    @Query('token') userToken : string,
  ): Promise<any> {
    return this.adminService.blockUser(userToken, userId);
  }

  @Post('registerUser')
  async registerUser(@Body() createUserDTO : CreateUserDTO){
    
  }
}
