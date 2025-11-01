const express = require('express');
const router = express.Router();
const protect = require('../middles/authMiddle');
const controllers = require('../controllers/auth');

router.post('/login', controllers.login);
router.post('/signup', controllers.signup);
router.post('/recover', controllers.recover);
router.post('/verify', controllers.verify);

module.exports = router;
