// routes/posts.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

// Iegūst postus no specifiska lietotāja izmantojot tā ID
router.get('/:id', postController.getPosts);

// Iegūst 5 jaunākos postus
router.get('/latest', postController.getLatestPosts);

// Izveido jaunu post
router.post('/', postController.createPost);

module.exports = router;
