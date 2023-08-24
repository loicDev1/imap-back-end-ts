import { IsBlockedUserMiddleware } from './is-blocked-user.middleware';

describe('IsBlockedUserMiddleware', () => {
  it('should be defined', () => {
    expect(new IsBlockedUserMiddleware()).toBeDefined();
  });
});
