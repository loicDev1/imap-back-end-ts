import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/CreateUserDTO';
import { User } from 'src/user/entities/User.entity';
import { UserService } from 'src/user/user.service';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { FirebaseService } from 'src/firebase/firebase.service';
import { serviceAccount } from 'credentials.json';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async register(partialUser: Partial<User>): Promise<Partial<User>>{
    const { email, password } = partialUser;
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this.firebaseService.auth,
          email,
          password,
        );
      await sendEmailVerification(userCredential.user);
      return this.userService.createUser(partialUser);
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

  async login() {}
}
