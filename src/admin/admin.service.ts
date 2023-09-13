import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRoleEnum } from 'src/Generics/UserRoleEnum';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';
import { Admin } from './entities/Admin.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponsePerso } from 'src/Generics/HttpResponsePerso';
import { UserService } from 'src/user/user.service';
import { USER_ROLES } from 'src/Generics/UserRoleList';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async getUsers(userToken: string): Promise<User[]> {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      return await this.userRepository.find();
    } catch (error) {
      return error;
    }
  }

  async blockUser(
    userToken: string,
    userId: number,
  ): Promise<any> {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      const userUpdated = await this.userRepository.preload({
        id: userId,
        //isBlocked: true,
        blockedBy: result.data.id,
      });
      userUpdated.isBlocked = !userUpdated.isBlocked
      return this.userRepository.save(userUpdated);
      //return { status: HttpStatus.OK, message: 'User Blocked' };
    } catch (error) {
      console.log(error);
    }
  }

  async registerUser(
    userToken: string,
    partialUser: Partial<User>,
    Request : any
  ): Promise<Partial<User>> {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      partialUser.createdBy = result.data.id;
      return this.userService.register(partialUser, Request);
    } catch (error) {
      return error
      // throw new HttpException(
      //   {
      //     status: HttpStatus.BAD_REQUEST,
      //     error: error.message,
      //   },
      //   HttpStatus.FORBIDDEN,
      //   {
      //     cause: error,
      //   },
      // );
    }
  }

  async updateUserRole(updateUserRole: Partial<User>) {
    try {
      if (USER_ROLES.includes(updateUserRole.role)) {
        await this.userRepository.save(updateUserRole);
        return { status: HttpStatus.OK, message: 'user updated successfully' };
      } else {
        throw new HttpException(
          'this user role is not available',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: number) {
    try {
      return await this.userRepository.softDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
