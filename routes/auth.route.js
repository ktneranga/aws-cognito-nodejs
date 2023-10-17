const express = require('express');
const controller = require('../controllers/auth.controller');
const validateSignupRequest = require('../middleware/validateSignupRequest');

const router = express.Router();

router.post('/auth/signup', controller.signup);
router.post('/auth/signupConfirm', controller.signupConfirm);
router.post('/auth/signin', controller.signin);

module.exports = router;
