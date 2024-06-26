const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

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
        createdAt: true,
        avatar_url: true,
        bio: true
      }
    });

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

// Update username
exports.updateUsername = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newUsername } = req.body;

  if (!currentPassword || !newUsername) {
    return res.status(400).json({ error: true, message: "Trūkst obligāto lauku." });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, username: true, password: true }
    });

    if (!user) {
      return res.status(404).json({ error: true, message: "Lietotājs nav atrasts." });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: true, message: "Nepareiza parole." });
    }

    const usernameTaken = await prisma.users.findUnique({
      where: { username: newUsername }
    });

    if (usernameTaken) {
      return res.status(409).json({ error: true, message: "Lietotājvārds jau ir aizņemts." });
    }

    await prisma.users.update({
      where: { id: userId },
      data: { username: newUsername }
    });

    res.status(200).json({ error: false, message: "Lietotājvārds veiksmīgi atjaunināts." });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

//Update full name
exports.updateFullname = async (req, res) => {
  const { userId } = req.params;
  const { userPassword, newFullname } = req.body;

  if (!userPassword || !newFullname) {
    return res.status(400).json({ error: true, message: "Trūkst obligāto lauku." });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, password: true }
    });

    if (!user) {
      return res.status(404).json({ error: true, message: "Lietotājs nav atrasts." });
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: true, message: "Nepareiza parole." });
    }

    await prisma.users.update({
      where: { id: userId },
      data: { fullname: newFullname }
    });

    res.status(200).json({ error: false, message: "Pilnais vārds veiksmīgi atjaunināts." });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

//Update e-email
exports.updateEmail = async (req, res) => {
  const { userId } = req.params;
  const { userPassword, newEmail } = req.body;

  if (!userPassword || !newEmail) {
    return res.status(400).json({ error: true, message: "Trūkst obligāto lauku." });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, email: true, password: true }
    });

    if (!user) {
      return res.status(404).json({ error: true, message: "Lietotājs nav atrasts." });
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: true, message: "Nepareiza parole." });
    }

    await prisma.users.update({
      where: { id: userId },
      data: { email: newEmail }
    });

    res.status(200).json({ error: false, message: "E-pasts veiksmīgi atjaunināts." });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

//Update password
exports.updatePassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: true, message: "Trūkst obligāto lauku." });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, password: true }
    });

    if (!user) {
      return res.status(404).json({ error: true, message: "Lietotājs nav atrasts." });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: true, message: "Nepareiza esošā parole." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.status(200).json({ error: false, message: "Parole veiksmīgi atjaunināta." });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

