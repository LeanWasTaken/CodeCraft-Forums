const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const isUserAuthenticated = require('../middlewares/isUserAuthenticated.js');

router.get('/', authController.getLoggedInUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
