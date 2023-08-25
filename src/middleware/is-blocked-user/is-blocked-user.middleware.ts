import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';

@Injectable()
export class IsBlockedUserMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    try {
      const result = await decodeJwtTokenToUser(req.query.token);
      if (result.data.isBlocked) {
        throw new HttpException(
          'This user is blocked',
          HttpStatus.UNAUTHORIZED,
        );
      } else if (!result.data.emailVerified) {
        throw new HttpException(
          "This user's email is not verify !",
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        next();
      }
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
}
