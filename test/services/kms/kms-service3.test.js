const KmsService = require('../../../services/kms/kms-service-clone');

/**
 * default export
 */

jest.mock('../../../services/kms/kms-service-clone');
// jest.mock('../../../services/kms/kms-service-clone', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       encryptSecret: jest.fn().mockResolvedValue('someEncryptedPassword')
//     }
//   })
// });

describe('happy scenario', () => {
    it('should use module mock using Jest', async () => {
        KmsService.mockImplementation(() => ({
            encryptSecret: jest.fn().mockResolvedValue('someEncryptedPassword'),
        }));
        const kms = new KmsService();
        expect(await kms.encryptSecret()).toBe('someEncryptedPassword');
    });
});
