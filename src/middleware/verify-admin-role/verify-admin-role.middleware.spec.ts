import { VerifyAdminRoleMiddleware } from './verify-admin-role.middleware';

describe('VerifyAdminRoleMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyAdminRoleMiddleware()).toBeDefined();
  });
});
