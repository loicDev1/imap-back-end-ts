import { VerifyPersonnelRoleMiddleware } from './verify-personnel-role.middleware';

describe('VerifyPersonnelRoleMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyPersonnelRoleMiddleware()).toBeDefined();
  });
});
