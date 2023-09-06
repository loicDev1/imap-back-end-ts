import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/CreateUserDTO';
import { User } from 'src/user/entities/User.entity';
import { UserService } from 'src/user/user.service';
import { MailerService } from '@nestjs-modules/mailer';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly mailerService: MailerService,
  ) {}

  async firebaseRegister(partialUser: Partial<User>): Promise<unknown> {
    try {
      const { email, password } = partialUser;
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this.firebaseService.auth,
          email,
          password,
        );
      await sendEmailVerification(userCredential.user);
      return userCredential;
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

  async FirebaseLogin(partialUser: Partial<User>): Promise<any> {
    try {
      const { email, password } = partialUser;
      return await signInWithEmailAndPassword(
        this.firebaseService.auth,
        email,
        password,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async FirebaseResetPasswordByEmail(email: string) {
    try {
      return await sendPasswordResetEmail(this.firebaseService.auth, email);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async sendEmailWithNodeMailer(
    emailSender: string,
    templape: string,
    emailReceiver: string,
  ) {
    try {
      await this.mailerService.sendMail({
        from: emailSender,
        to: emailReceiver,
        subject: 'Testing node mailer',
        text: 'welcome',
        html: templape,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
