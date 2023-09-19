const express = require('express');
const authRouter = require('./auth.route');
require('dotenv').config();

const router = express.Router();

router.get(`${process.env.API_PREFIX}/health`, (req, res) => res.status(200).json({ msg: 'Server is running' }));
router.use(`${process.env.API_PREFIX}`, authRouter);

module.exports = router;
