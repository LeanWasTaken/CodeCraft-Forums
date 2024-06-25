// routes/posts.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

// Iegūst 5 jaunākos postus
router.get('/latest', postController.getLatestPosts);

// Iegūst postus no specifiska lietotāja izmantojot tā ID
router.get('/:id', postController.getPosts);

// Izveido jaunu post
router.post('/', postController.createPost);

module.exports = router;
