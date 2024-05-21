import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createPost(req, res) {
  try {
    const { title, content, type, topic, userId } = req.body;

    if (!userId) {
      return res.status(409).json({ message: 'No user provided.' });
    }

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (!title) {
      return res.status(409).json({ message: 'Post title is missing.' });
    } else if (!content) {
      return res.status(409).json({ message: 'Post content is missing.' });
    } else if (!type) {
      return res.status(409).json({ message: 'Post type is missing.' });
    } else if (!topic) {
      return res.status(409).json({ message: 'Post topic is missing.' });
    }

    const post = await prisma.posts.create({
      data: {
        title,
        content,
        type,
        topic,
        authorId: userId,
      },
    });

    if (post) {
      return res.status(201).json({ message: 'Post created.' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteComment(req, res) {
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
}

export async function getCommentsByPostId(req, res) {
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
}
