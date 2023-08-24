import { VerifyEtudiantRoleMiddleware } from './verify-etudiant-role.middleware';

describe('VerifyEtudiantRoleMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyEtudiantRoleMiddleware()).toBeDefined();
  });
});
