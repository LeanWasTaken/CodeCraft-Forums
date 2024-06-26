// routes/posts.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

// Iegūst 5 jaunākos postus
router.get('/latest', postController.getLatestPosts);

// Iegūst postus no specifiska lietotāja izmantojot tā ID
router.get('/user/:id', postController.getPosts);

// Iegūst postu ar specifisku ID
router.get('/:id', postController.getPostById)

// Izveido jaunu post
router.post('/', postController.createPost);

module.exports = router;
