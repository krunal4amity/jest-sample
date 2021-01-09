const { KMS } = require('aws-sdk');

const { KmsService } = require('./services/kms/kms-service');

const kmsClient = new KMS({ region: 'us-east-2' });
const kms = new KmsService(kmsClient);

async function start() {
    try {
        console.log(await kms.decryptSecret(await kms.encryptSecret('alias/krunal', 'myDBpassword')));
    } catch (error) {
        console.log(error);
    }
}

start();
