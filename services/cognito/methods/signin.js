const { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');

const signin = (poolData, body, callback) => {
    const userPool = new CognitoUserPool(poolData);

    const { username, password } = body;

    const authenticationData = {
        Username: username,
        Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
        Username: username,
        Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (res) => {
            const data = {
                refreshToken: res.getRefreshToken().getToken(),
                accessToken: res.getAccessToken().getJwtToken(),
                accessTokenExpiredAt: res.getAccessToken().getExpiration(),
                idToken: res.getIdToken().getJwtToken(),
                idTokenExpiredAt: res.getAccessToken().getExpiration(),
            };
            callback(null, data);
        },
        onFailure: (err) => {
            callback(err);
        },
        mfaRequired: () => {
            const data = {
                nextStep: 'MFA_AUTH',
                loginSession: cognitoUser.Session,
            };
            callback(null, data);
        },
        totpRequired: () => {
            const data = {
                nextStep: 'SOFTWARE_TOKEN_MFA',
                loginSession: cognitoUser.Session,
            };
            callback(null, data);
        },
        newPasswordRequired: () => {
            const data = {
                nextStep: 'NEW_PASSWORD_REQUIRED',
                loginSession: cognitoUser.Session,
            };
            callback(null, data);
        },
    });
};

module.exports = { signin };
