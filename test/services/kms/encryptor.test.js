const { KmsService } = require('../../../services/kms/kms-service');
const { doEncrypt } = require('../../../services/kms/encryptor');
/**
 * Mock a module
 */
jest.mock('../../../services/kms/kms-service');

describe('mock the whole module', () => {
    it('should use the mocked module', async () => {
        const mockEncryptSecret = jest.fn().mockResolvedValue('samplePassworQ==');
        KmsService.mockImplementation(() => ({
            encryptSecret: mockEncryptSecret,
        }));
        const expected = await doEncrypt();
        expect(expected).toMatchObject({ DB_PASSWORD: 'samplePassworQ==' });
        expect(mockEncryptSecret).toHaveBeenCalledWith('alias/sample', 'mypassword');
        expect(mockEncryptSecret).toHaveBeenCalledTimes(1);
    });
    it('should use the mocked module, throw error', async () => {
        const mockEncryptSecret = jest.fn().mockRejectedValue(new Error('something bad happened'));
        KmsService.mockImplementation(() => ({
            encryptSecret: mockEncryptSecret,
        }));
        expect(async () => { await doEncrypt(); }).rejects.toThrow('something bad happened');
    });
});
