const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destPath = file.fieldname === 'avatar' ? 'avatars/' : 'banners/';
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    const userId = req.params.userId;
    const fileName = `${userId}.png`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

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
        return res.status(200).json({ error: true, message: 'No user provided.' });
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
        return res.status(201).json({error: false, message: "Valoda atjaunināta"});
      } else {
        return res.status(201).json({ error: false, message: "Iestatījums netika atrasts"})
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


exports.updateUserImages = [
  upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),
  async (req, res) => {
    const { userId } = req.params;

    try {
      const updateData = {};
      if (req.files['avatar']) {
        updateData.avatar = `/avatars/${userId}.png`;
      }
      if (req.files['banner']) {
        updateData.banner = `/banners/${userId}.png`;
      }

      const user = await prisma.users.update({
        where: { id: userId },
        data: updateData,
      });
      res.json({ message: 'Images updated successfully!', user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update images', message: error.message });
    }
  }
];

