const { KmsService } = require('../../../services/kms/kms-service');
const { doEncrypt } = require('../../../services/kms/encryptor');

/**
 * spyOn method
 */

describe('jest.spyOn', () => {
    it('should spy on encrypt method', async () => {
        /**
   * on a class use  jest.spyOn(Class.Prototype, 'methodname');
   * on an class instance jest.spyOn(classInstance, 'methodname');
   */

        /**
   * the following only tracks the calls but does not change the implementation,
   * not advisable for network calls, since that won't be a network call then.
   */

        const spy = jest.spyOn(KmsService.prototype, 'encryptSecret');
        const result = await doEncrypt();
        console.log(result);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('alias/sample', 'mypassword');
        expect(spy).toHaveBeenLastCalledWith('alias/sample', 'mypassword');
        expect(result).toHaveProperty('DB_PASSWORD');
        spy.mockRestore();

        /**
   * the following tracks the calls as well as changes the implementation,
   */
        const spy2 = jest.spyOn(KmsService.prototype, 'encryptSecret').mockImplementation(() => 'myencryptedpassword');
        const result2 = await doEncrypt();
        console.log(result2);
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledWith('alias/sample', 'mypassword');
        expect(spy2).toHaveBeenLastCalledWith('alias/sample', 'mypassword');
        expect(result2).toMatchObject({ DB_PASSWORD: 'myencryptedpassword' });
        // expect(result2).toBe({DB_PASSWORD: 'myencryptedpassword'}); gives error 'serializes to the same string'

        /**
   * mockRestore here will 'unmock' the function, so original implementation will be restored.
   */
        spy2.mockRestore();
        const result3 = await doEncrypt();
        console.log(result3);
        expect(result3).toHaveProperty('DB_PASSWORD');
    });
});
