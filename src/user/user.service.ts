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
import { LogService } from 'src/log/log.service';
import { getRequestInfos } from 'src/helpers/helpers.useRequest';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly logService: LogService,
  ) {}

  async register(
    partialUser: Partial<User>,
    Request?: any,
  ): Promise<Partial<User>> {
    try {
      await this.authService.firebaseRegister(partialUser);
      delete partialUser.password;
      const userCreated = await this.userRepository.save(partialUser);
      const { description, typeOperation } = getRequestInfos(Request);
      this.logService.createLog({
        description,
        typeOperation,
        user: userCreated.id,
      });
      return userCreated;
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

  async login(credentials: Partial<User>, Request?: any): Promise<unknown> {
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

      const { description, typeOperation } = getRequestInfos(Request);
      this.logService.createLog({
        description,
        typeOperation,
        user: user.id,
      });

      return { ...user, userToken };
    } catch (error) {
      return error
    }
  }

  async getUserProfile(userToken: string) {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      const user = await this.userRepository.findOneBy({ id: result.data.id });
      delete user.password;
      return user;
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

  async updateUser(
    updateUser: UpdateUserDTO,
  ): Promise<HttpResponsePerso | void> {
    try {
      await this.userRepository.save(updateUser);
      return { status: HttpStatus.OK, message: 'user updated successfully' };
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

  async ResetPasswordByEmail(email: string, userToken: string, Request?: any) {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      const { description, typeOperation } = getRequestInfos(Request);
      this.logService.createLog({
        description,
        typeOperation,
        user: result.data.id,
      });
      return await this.authService.FirebaseResetPasswordByEmail(email);
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
}
