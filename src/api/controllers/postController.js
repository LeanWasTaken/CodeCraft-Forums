const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
  console.log("getPosts")
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(409).json({ message: 'No user provided.' });
    }

    const posts = await prisma.posts.findMany({
      where: {
        author: {
            id: id
          }
      },
      include: {  
        author: {
          select: {
            fullname: true,
            username: true,
            avatar_url: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
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

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(409).json({ message: 'No ID provided.' });
    }

    const post = await prisma.posts.findMany({
      where: {
        id: id
      },
      include: {
        author: {
          select: {
            fullname: true,
            username: true,
            avatar_url: true
          }
        }
      },
    });

    if (post) {
      return res.status(201).json(post);
    } else {
      return res.status(404).json({ message: "No posts found."})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getLatestPosts = async (req, res) => {
  console.log("getLatestPosts")
  try {
    const { skip = 0, take = 5 } = req.query;

    const posts = await prisma.posts.findMany({
      include: {
        _count: true,
        author: {
          select: {
            fullname: true,
            username: true,
            avatar_url: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: parseInt(skip),
      take: parseInt(take),
    });

    if (posts.length) {
      return res.status(200).json(posts); // Change status code to 200
    } else {
      console.log('No posts found');
      return res.status(404).json({ message: "No posts found." });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createPost = async (req, res) => {
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
