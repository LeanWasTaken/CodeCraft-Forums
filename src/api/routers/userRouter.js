const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Get user by username
router.get('/username/:username', userController.getUserByUsername);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update username
router.patch('/username/:userId', userController.updateUsername);

// Update full name
router.patch('/fullname/:userId', userController.updateFullname);

// Update email
router.patch('/email/:userId', userController.updateEmail);

// Update password
router.patch('/password/:userId', userController.updatePassword);

// Delete user account
router.delete('/deactivate/:userId/:currentPassword', userController.deleteUser)

module.exports = router;
