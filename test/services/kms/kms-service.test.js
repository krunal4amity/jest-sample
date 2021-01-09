const { KMS } = require('aws-sdk');
const { KmsService } = require('../../../services/kms/kms-service');

/**
 * Mock AWS KMS module.
 */

describe('kms service happy scenario', () => {
    test('by using a non-jest mock client', async () => {
        const kmsMockClient = {
            encrypt: () => ({
                promise: () => ({ CiphertextBlob: Buffer.from('samplePassword', 'base64') }),
            }),
        };
        const kms = new KmsService(kmsMockClient);
        expect(await kms.encryptSecret('abcd', '1234')).toBe('samplePassworQ==');
    });
    test('by modifying module method ', async () => {
        KMS.prototype.encrypt = () => ({
            promise: () => ({ CiphertextBlob: Buffer.from('samplePassword', 'base64') }),
        });
        const kmsMockClient2 = new KMS();
        const kms = new KmsService(kmsMockClient2);
        expect(await kms.encryptSecret('abcd', '1234')).toBe('samplePassworQ==');
    });
    test('by using a jest mock client', async () => {
        const mockPromise = jest.fn().mockResolvedValue({ CiphertextBlob: Buffer.from('samplePassword', 'base64') });
        const mockEncrypt = jest.fn().mockImplementation(() => ({
            promise: mockPromise,
        }));
        const kmsMockClient3 = {
            encrypt: mockEncrypt,
        };
        const kms = new KmsService(kmsMockClient3);
        expect(await kms.encryptSecret('abcd', '1234')).toBe('samplePassworQ==');
        expect(mockEncrypt).toHaveBeenCalledWith({ KeyId: 'abcd', Plaintext: '1234' });
        expect(mockEncrypt).toHaveBeenCalledTimes(1);
    });
});

describe('unhappy scenario', () => {
    it('should throw an error', async () => {
        const mockPromise = jest.fn().mockRejectedValue(new Error('something bad happened.'));
        const mockEncrypt = jest.fn().mockImplementation(() => ({
            promise: mockPromise,
        }));
        const kmsMockClient4 = {
            encrypt: mockEncrypt,
        };
        const kms = new KmsService(kmsMockClient4);
        try {
            await kms.encryptSecret('abcd', '1234');
        } catch (error) {
            expect(error.message).toBe('something bad happened.');
        }
        expect(async () => { await kms.encryptSecret('abcd', '1234'); }).rejects.toThrow('something bad happened');
    // the following would not work
    // expect(await kms.encryptSecret('abcd', '1234')).rejects.toThrow('something bad happened')
    });
});
