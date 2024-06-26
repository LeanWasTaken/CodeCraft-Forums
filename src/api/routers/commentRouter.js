const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');

// Creates a new comment
router.post('/', commentController.createComment);

// Deletes a comment
router.delete('/', commentController.deleteComment);

// Gets comments by post ID
router.get('/:postId', commentController.getCommentsByPostId);

// Gets comment count by post ID
router.get('/count/:postId', commentController.getCommentsCountByPostId);

module.exports = router;
