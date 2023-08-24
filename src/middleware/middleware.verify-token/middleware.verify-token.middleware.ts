import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { verifyToken } from 'src/helpers/helpers.utils';

@Injectable()
export class MiddlewareVerifyTokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    try {
      if (req.query.token) {
        const tokenProvideByQueryParams = req.query.token.toString();
        await verifyToken(tokenProvideByQueryParams);
      } else if (req.body.userToken) {
        const tokenProvidedByBody = req.body.userToken;
        await verifyToken(tokenProvidedByBody);
      } else {
        throw new HttpException(
          "Token it's not provided",
          HttpStatus.FORBIDDEN,
        );
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
