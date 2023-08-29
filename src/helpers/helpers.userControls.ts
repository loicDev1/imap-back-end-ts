import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';

export async function isVerifyEmail(
  authenticateUser: any,
  userRepository: Repository<User>,
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const { emailVerified, email } = authenticateUser.user.reloadUserInfo;
    if (emailVerified) {
      const userFound = await userRepository.findOneBy({ email });
      if (!userFound)
        reject({ error: HttpStatus.NOT_FOUND, message: 'User not found' });
      userFound.emailVerified = true;
      await userRepository.save({ ...userFound });
      resolve(userFound);
    } else {
      reject(
        new HttpException(
          "This user's email is not verify !",
          HttpStatus.UNAUTHORIZED,
        ),
      );
    }
  });
}

export async function isBlockedUser(user: Partial<User>): Promise<any> {
  return new Promise(async (resolve, reject) => {
    if (!user.isBlocked) {
      resolve(user);
    } else {
      reject(
        new HttpException('This user is Blocked !', HttpStatus.UNAUTHORIZED),
      );
    }
  });
}
