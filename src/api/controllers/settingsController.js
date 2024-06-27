const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserSettings = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(409).json({ message: 'No user provided.' });
    }

    const settings = await prisma.users.findUnique({
      where: {
        id: id
      },
      select: {  
        lang: true
      },
    });

    if (settings) {
      return res.status(201).json(settings);
    } else {
      return res.status(404).json({ message: "No settings found."})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.updateUserSettings = async (req, res) => {
    try {
      const { userId, newLang } = req.body;
  
      if (!userId) {
        return res.status(409).json({ message: 'No user provided.' });
      }
  
      const settings = await prisma.users.update({
        where: {
            id: userId
          },
          data: {
            lang: newLang
          },
      });
  
      if (settings) {
        return res.status(201).json(settings);
      } else {
        return res.status(404).json({ message: "No settings found."})
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

