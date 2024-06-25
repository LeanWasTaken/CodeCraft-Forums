const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get a user by their username
exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await prisma.users.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            fullname: true,
            createdAt: true
        }});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something happened that shouldn't have happened..."});
  }
}

// Get a user by their ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
        where: { id },
        select: {
            username: true,
            fullname: true,
            createdAt: true,
            id: true
        }});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
