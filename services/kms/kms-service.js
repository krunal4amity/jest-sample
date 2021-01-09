class KmsService {
    constructor(kmsClient) {
        this.kmsClient = kmsClient;
    }

    async encryptSecret(alias, secret) {
        const params = {
            KeyId: alias,
            Plaintext: secret,
        };
        try {
            const { CiphertextBlob } = await this.kmsClient.encrypt(params).promise();
            return CiphertextBlob.toString('base64');
        } catch (e) {
            console.log('KmsService: ', e);
            throw e;
        }
    }

    async decryptSecret(cipher) {
        const params = {
            CiphertextBlob: Buffer.from(cipher, 'base64'),
        };
        try {
            const { Plaintext } = await this.kmsClient.decrypt(params).promise();
            return Plaintext.toString();
        } catch (e) {
            console.log('KmsService: ', e);
            throw e;
        }
    }
}

module.exports = { KmsService };
