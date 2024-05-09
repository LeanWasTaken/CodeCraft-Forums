const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    // Check if the post exists
    const post = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create the comment
    const comment = await prisma.comments.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId, userId } = req.body;

    const comment = await prisma.comments.delete({
      where: {
        id: commentId,
        authorId: userId,
      },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res.status(201).send({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch comments for the given post id
    const comments = await prisma.comments.findMany({
      where: {
        postId,
      },
      include: {
        author: {
          select: {
            fullname: true,
            username: true,
          },
        },
      },
    });
    if (comments.length < 1) {
      return res.status(404).send({ message: 'No comments found for post.' });
    }
    return res.status(200).send(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Other comment-related controller functions can be added as needed
