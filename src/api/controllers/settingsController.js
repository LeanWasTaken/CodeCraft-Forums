const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const baseDir = path.resolve(__dirname, '../../../public');
    const destPath = file.fieldname === 'avatar' ? path.join(baseDir, 'avatars') : path.join(baseDir, 'banners');
    
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    console.log(`Destination path for ${file.fieldname}:`, destPath);
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    const userId = req.params.userId;
    const ext = path.extname(file.originalname);
    const fileName = `${userId}${ext}`;
    console.log(`File name for ${file.fieldname}:`, fileName);
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

    console.log(userId)

    try {
      const updateData = {};
      if (req.files['avatar']) {
        const avatarFile = req.files['avatar'][0];
        const avatarExt = path.extname(avatarFile.originalname);
        const avatarPath = `/avatars/${userId}${avatarExt}`;
        updateData.avatar_url = avatarPath;
        console.log(`Avatar uploaded to: ${avatarPath}`);
      }
      if (req.files['banner']) {
        const bannerFile = req.files['banner'][0];
        const bannerExt = path.extname(bannerFile.originalname);
        const bannerPath = `/banners/${userId}${bannerExt}`;
        updateData.banner_url = bannerPath;
        console.log(`Banner uploaded to: ${bannerPath}`);
      }

      const user = await prisma.users.update({
        where: { id: userId },
        data: updateData,
      });
      res.json({ message: 'Images updated successfully!', user });
    } catch (error) {
      console.log(error)
      res.status(200).json({ error: true, message: 'Failed to update images' });
    }
  }
];

