const { CognitoUserPool, CognitoUserAttribute } = require('amazon-cognito-identity-js');

const attributes = (key, value) => ({
    Name: key,
    Value: value,
});

/**
 * Signup user
 *
 * @param {poolData} poolData
 * @param {{ username: string, password: string, nickname: string, phone_number: string, }} body
 * @param {*} callback
 */

const signup = async (poolData, body) => {
    const userPool = new CognitoUserPool(poolData);
    const { username, password, nickname, phone_number } = body;
    const attributesList = [attributes('email', username), attributes('nickname', nickname), attributes('phone_number', phone_number)];
    const cognitoAttributeList = attributesList.map((element) => new CognitoUserAttribute(element));
    userPool.signUp(username, password, cognitoAttributeList, null, (err, res) => {
        if (err) {
            callback(err);
            return;
        }
        const data = {
            user_id: res.userSub,
            email: res.username,
            user_confirmed: res.userConfirmed,
        };
        callback(null, data);
    });
    // try {
    //     const userPool = new CognitoUserPool(poolData);
    //     const { username, password, nickname, phone_number } = body;
    //     const attributesList = [attributes('email', username), attributes('nickname', nickname), attributes('phone_number', phone_number)];
    //     const cognitoAttributeList = attributesList.map((element) => new CognitoUserAttribute(element));
    //     console.log(cognitoAttributeList);
    //     try {
    //         const res = await userPool.signUp(username, password, cognitoAttributeList);
    //         console.log(res);
    //         const data = {
    //             user_id: res.userSub,
    //             email: res.username,
    //             user_confirmed: res.userConfirmed,
    //         };
    //         return data;
    //     } catch (userPoolErr) {
    //         console.log(userPoolErr);
    //         throw userPoolErr;
    //     }
    // } catch (error) {
    //     console.log(error);
    //     return error;
    // }
};

module.exports = signup;
