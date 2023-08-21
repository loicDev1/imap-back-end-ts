import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async createUser(partialUser: Partial<User>): Promise<Partial<User>> {
    try {
      delete partialUser.password
      return userCreatedawait this.userRepository.save(partialUser)
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async getUsers() {}

  async getUserById() {}

  async updateUser() {}

  async deleteUser() {}
}
