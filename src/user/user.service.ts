import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { generateTokenForUser } from 'src/helpers/helpers.utils';

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
    const { email, password } = credentials;
    const authenticateUser = await this.authService.FirebaseLogin(credentials);
    const user = await this.userRepository.findOneBy({ email });
    const userToken = await generateTokenForUser(user);
    return { ...user, userToken };
  }

  async getUsers() {}

  async getUserById() {}

  async updateUser() {}

  async deleteUser() {}
}
