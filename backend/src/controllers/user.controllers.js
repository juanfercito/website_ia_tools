const bcryptjs = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Configurate Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    console.log(file);
    // Replace the spaces with the original name
    const safeFileName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${safeFileName}`);
  },
});

const upload = multer({ storage: storage});

// controllers/user.controllers.js
const updateUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: "error", message: "User not authenticated" });
    }

    const { id: userId } = req.user;
    const { name, username, email } = req.body;

    let profileImgUrl = null;
    let profileImgId = null;

    if (req.file) {
      profileImgUrl = `http://localhost:3000/uploads/${req.file.filename}`;
      console.log("Archivo recibido:", req.file);

      // Upsert en ProfileImg (asegúrate que userId sea único en tu modelo)
      const profileImg = await prisma.profileImg.upsert({
        where: { userId },
        create: { url: profileImgUrl, userId },
        update: { url: profileImgUrl },
      });

      profileImgId = profileImg.id;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        username,
        email,
        profileImgId: profileImgId || undefined,
      },
      include: { 
        profileImg: true,
        role: true
      },
    });

    console.log("Updated User:", updatedUser);

    const token = jwt.sign(
      {
        userId: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role.name,
        profilePicture: updatedUser.profileImg?.url || "/default-avatar.png",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    };

    res.cookie("jwt", token, cookieOption);

    res.status(200).send({
      status: "ok",
      message: "Profile updated successfully",
      user: {
        ...updatedUser,
        profilePicture: updatedUser.profileImg?.url || "/default-avatar.png",
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
};

module.exports = { updateUser, upload };