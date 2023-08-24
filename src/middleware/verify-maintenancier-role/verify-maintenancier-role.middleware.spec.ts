import { VerifyMaintenancierRoleMiddleware } from './verify-maintenancier-role.middleware';

describe('VerifyMaintenancierRoleMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyMaintenancierRoleMiddleware()).toBeDefined();
  });
});
