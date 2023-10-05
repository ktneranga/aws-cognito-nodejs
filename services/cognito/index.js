const CognitoItentityMethods = require('./methods');
require('dotenv').config();

const poolData = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
};

console.log(poolData);

/**
 * @param {{UserPoolId, ClientId, Paranoia }}
 *  The @param Paranoia setting helps to prevent accidental deletion of user accounts or other critical settings.
 */

class CognitoIdentityService {
    constructor() {
        this.poolData = poolData;
    }

    signup(body) {
        return CognitoItentityMethods.signup(this.poolData, body);
    }
}

module.exports = function Wrapper() {
    return new CognitoIdentityService();
};
