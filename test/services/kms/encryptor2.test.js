const KmsService = require('../../../services/kms/kms-service-clone');
const { doEncrypt } = require('../../../services/kms/encryptor2');

/**
 * default export
 */

jest.mock('../../../services/kms/kms-service-clone', () => {
    return jest.fn().mockImplementation(() => {
        return {
            encryptSecret: jest.fn().mockResolvedValue('someEncryptedPassword')
        };
    });
});

describe('happy scenario', () => {
    it('should use module mock using Jest', async () => {
        expect(await doEncrypt()).toMatchObject({DB_PASSWORD: 'someEncryptedPassword'});
    });
    it('should use module mock using Jest, overriding common mock impl', async () => {
        KmsService.mockImplementation(() => ({
            encryptSecret: jest.fn().mockResolvedValue('someEncryptedPassword_v2'),
        }));
        expect(await doEncrypt()).toMatchObject({DB_PASSWORD: 'someEncryptedPassword_v2'});
    });
});
