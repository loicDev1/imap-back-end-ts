import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRoleEnum } from 'src/Generics/UserRoleEnum';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';
import { Admin } from './entities/Admin.entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(userToken: string): Promise<User[]> {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async blockUser(userToken: string, userId: number) {
    try {
      const result = await decodeJwtTokenToUser(userToken);
        const userUpdated = await this.userRepository.preload({
          id: userId,
          isBlocked: true,
          blockedBy: result.data.id,
        });
        this.userRepository.save(userUpdated);
        return { status: HttpStatus.OK, message: 'User Blocked' };
    } catch (error) {
      console.log(error);
    }
  }

  async registerUser(
    token: string,
    parialUser: Partial<User>,
  ) /*: Partial<User>*/ {
    // const result = await decodeJwtTokenToUser(userToken);
    // return
  }

  async deleteUser() {}
}
