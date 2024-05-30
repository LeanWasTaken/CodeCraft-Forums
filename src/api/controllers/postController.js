const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
  try {
    const { userId } = req.query;

    console.log(req.query)

    if (!userId) {
      return res.status(409).json({ message: 'No user provided.' });
    }

    const posts = await prisma.posts.findMany({
      where: {
        author: {
            id: userId
          }
      },
      include: {
        author: {
          select: {
            fullname: true,
            username: true
          }
        }
      }
    });

    if (posts) {
      return res.status(201).json(posts);
    } else {
      return res.status(404).json({ message: "No posts found."})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.createPost = async (req, res) => {
  try {
    const { title, content, type, topic, userId } = req.body;

    console.log(req.body)

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
        type: type,
        topic: {
          connect: {
            name: topic
          }
        },
        author: {
          connect: {
            id: userId
          }
        }
      }
    });

    if (post) {
      return res.status(201).json({ message: 'Post created.' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' });
  }
}
