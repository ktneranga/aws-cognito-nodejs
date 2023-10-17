const { CognitoUserPool, CognitoUserAttribute, CognitoUser } = require('amazon-cognito-identity-js');

/**
 * Confirm the signup action
 * @param {*} poolData
 * @param {{username, confirmationCode}} body
 * @param {*} callback
 */

const signupConfirm = (poolData, body, callback) => {
    const userPool = new CognitoUserPool(poolData);

    const { username, confirmationcode } = body;

    const userData = {
        Username: username,
        Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationcode, true, (err, res) => callback(err, res));
};

module.exports = { signupConfirm };
