import { MiddlewareVerifyTokenMiddleware } from './middleware.verify-token.middleware';

describe('MiddlewareVerifyTokenMiddleware', () => {
  it('should be defined', () => {
    expect(new MiddlewareVerifyTokenMiddleware()).toBeDefined();
  });
});
