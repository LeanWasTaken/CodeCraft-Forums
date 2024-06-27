// routes/posts.js
const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController.js');

// Iegūst 5 jaunākos postus
router.get('/:id', settingsController.getUserSettings);

router.patch('/', settingsController.updateUserSettings);

router.post('/images/:userId', settingsController.updateUserImages)

module.exports = router;