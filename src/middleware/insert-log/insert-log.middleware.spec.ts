import { InsertLogMiddleware } from './insert-log.middleware';

describe('InsertLogMiddleware', () => {
  it('should be defined', () => {
    expect(new InsertLogMiddleware()).toBeDefined();
  });
});
