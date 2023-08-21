import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/CreateUserDTO';
import { User } from 'src/user/entities/User.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(partialUser : Partial<User>) {
    // FireBase logic

   this.userService.createUser(partialUser) // ajout dans la base de donné
  }

  async login() {
    
  }

}
