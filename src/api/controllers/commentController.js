const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  try {
    const { content, postId, userId, type, parentId } = req.body;
    console.log(req.body)
    if (!content || !postId || !userId || !type) {
      return res.status(400).json({ error: true, message: "One or more fields are missing." });
    }

    const post = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (parentId) {
      const parentComment = await prisma.comments.findUnique({
        where: {
          id: parentId,
        },
      });

      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
    }

    const comment = await prisma.comments.create({
      data: {
        content,
        postId,
        authorId: userId,
        type,
        parentId: parentId || null,
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

    const comments = await prisma.comments.findMany({
      where: {
        postId,
      },
      include: {
        author: {
          select: {
            fullname: true,
            username: true,
            avatar_url: true
          },
        },
      },
    });
    if (comments.length < 1) {
      return res.status(200).send({ error: "no-comment", message: 'No comments found for post.' });
    }
    return res.status(200).send(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCommentsCountByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const commentsCount = await prisma.comments.count({
      where: {
        postId: postId,
      },
    });

    return res.status(200).json({ count: commentsCount });
  } catch (error) {
    console.error('Error fetching comments count:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCommentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await prisma.comments.findMany({
      where: {
        authorId: userId
      },
      include: {
        post: {
          select: {
            id: true,
            title: true
          }
        },
        author: {
          select: {
            username: true,
            fullname: true,
            avatar_url: true
          }
        }
      }
    });
    if(comments) {
      return res.status(200).json(comments)
    }
  } catch (error) {
    console.log(error)
  }
}