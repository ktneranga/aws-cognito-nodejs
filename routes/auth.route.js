const express = require('express');
const controller = require('../controllers/auth.controller');
const validateSignupRequest = require('../middleware/validateSignupRequest');

const router = express.Router();

router.post('/auth/signup', controller.signup);

module.exports = router;
