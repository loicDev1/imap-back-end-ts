import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UserRoleEnum } from 'src/Generics/UserRoleEnum';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';

@Injectable()
export class VerifyAdminRoleMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    try {
      const result = await decodeJwtTokenToUser(req.query.token);
      if (UserRoleEnum.ADMIN === result.data.role) {
        next();
      } else {
        throw new HttpException('permission denied !', HttpStatus.UNAUTHORIZED);
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
