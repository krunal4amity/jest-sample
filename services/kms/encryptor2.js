'use script';

const { KMS } = require('aws-sdk');
const KmsService = require('./kms-service-clone');

async function doEncrypt() {
    const kmsClient = new KMS({ region: 'us-east-2' });
    const kmsServiceInstance = new KmsService(kmsClient);
    const encPassword = await kmsServiceInstance.encryptSecret('alias/sample', 'mypassword');
    return { DB_PASSWORD: encPassword };
}

// doEncrypt().then(result=>{console.log(result)})

module.exports = {
    doEncrypt,
};
