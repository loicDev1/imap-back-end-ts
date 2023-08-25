import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import {
  decodeJwtTokenToUser,
  generateTokenForUser,
} from 'src/helpers/helpers.utils';
import { HttpResponsePerso } from 'src/Generics/HttpResponsePerso';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { isBlockedUser, isVerifyEmail } from 'src/helpers/helpers.userControls';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async register(partialUser: Partial<User>): Promise<Partial<User>> {
    try {
      await this.authService.firebaseRegister(partialUser);
      delete partialUser.password;
      return await this.userRepository.save(partialUser);
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

  async login(credentials: Partial<User>): Promise<unknown> {
    try {
      const { email, password } = credentials;
      const authenticateUser = await this.authService.FirebaseLogin(
        credentials,
      );

      const result = await Promise.all([
        await isBlockedUser(
          await isVerifyEmail(authenticateUser, this.userRepository),
        ),
      ]);

      const user = result[result.length - 1];
      const userToken = await generateTokenForUser(user);
      return { ...user, userToken };
    } catch (error) {
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

  async getUserProfile(userToken: string) {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      const user = await this.userRepository.findOneBy({ id: result.data.id });
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(
    updateUser: UpdateUserDTO,
  ): Promise<HttpResponsePerso | void> {
    try {
      await this.userRepository.save(updateUser);
      return { status: HttpStatus.OK, message: 'user updated successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  async ResetPasswordByEmail(email: string) {
    try {
      return this.authService.FirebaseResetPasswordByEmail(email);
    } catch (error) {
      console.log(error);
    }
  }
}
