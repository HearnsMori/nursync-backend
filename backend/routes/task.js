const express = require('express');
const router = express.Router();
const protect = require('../middles/authMiddle');
const controllers = require('../controllers/task');

router.post('/create', protect, controllers.create);
router.post('/read', protect, controllers.read);
router.post('/update', protect, controllers.update);
router.post('/deletE', protect, controllers.deletE);

module.exports = router;
