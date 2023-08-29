import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getRequestInfos } from 'src/helpers/helpers.useRequest';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';
import { LogService } from 'src/log/log.service';

@Injectable()
export class InsertLogMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}
  async use(req: any, res: any, next: () => void) {
    try {
      if (req.query.token) {
        const result = await decodeJwtTokenToUser(req.query.token.toString());
        const { description, typeOperation } = getRequestInfos(req);
        this.logService.createLog({
          user: result.data.id,
          typeOperation,
          description,
        });
      }
      next();
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
