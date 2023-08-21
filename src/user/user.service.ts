import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { User } from './entities/User.entity';

@Injectable()
export class UserService {

    async createUser(user : Partial<User>){

    }

    async getUsers(){

    }

    async getUserById(){

    }

    async updateUser(){

    }

    async deleteUser(){

    }
}
