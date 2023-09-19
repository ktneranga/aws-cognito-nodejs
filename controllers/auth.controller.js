const CognitoIdentity = require('../services/cognito');

const CognitoIdentityService = CognitoIdentity();

const signup = async (req, res) => {
    // Signup logic here
    // ...

    const { email, password, nickname, phone_number } = req.body;

    const cognitoParams = {
        username: email,
        password,
        nickname,
        phone_number,
    };

    try {
        const cognitoUser = await new Promise((resolve, reject) => {
            CognitoIdentityService.signup(cognitoParams, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });

        res.status(200).send({
            success: true,
            message: 'User registered successfully',
            user: cognitoUser,
        });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message, error });
    }
};

module.exports = {
    signup,
};
