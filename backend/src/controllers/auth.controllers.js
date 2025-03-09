const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();

async function login(req, res) {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ status: "error", message: "All fields are required" });
  }

  try {
    // Buscar al usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }, // Incluir el rol del usuario
    });

    if (!user) {
      return res.status(400).send({ status: "error", message: "Invalid credentials" });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ status: "error", message: "Invalid credentials" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { userId: user.id, 
        email: user.email, 
        username: user.username, 
        role: user.role.name,
        profilePicture: user.profileImgId?.url ||"https://via.placeholder.com/150" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Configurar la cookie
    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    };
    
    res.cookie("jwt", token, cookieOption);

    // Redirigir según el rol del usuario
    if (user.role.name === "admin") {
      return res.send({ status: "ok", message: "Logged Admin", redirect: "/admin-panel", token, user });
    } else {
      return res.send({ status: "ok", message: "Logged User", redirect: "/dashboard", token, user });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ status: "error", message: "Internal server error" });
  }
}

async function register(req, res) {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).send({ status: "error", message: "All fields are required" });
  }

  try {
    // Verify if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return res.status(400).send({ status: "error", message: "Username already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Obtain the default role ("freeUser")
    const defaultRole = await prisma.role.findUnique({
      where: { name: "freeUser" }, // Buscar el rol por su nombre
    });

    if (!defaultRole) {
      return res.status(500).send({ status: "error", message: "Default role not found" });
    }

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        roleId: defaultRole.id,
      },
    });

    console.log("New user created:", newUser);
    return res.status(201).send({ status: "ok", message: `User ${newUser.username} Created`, redirect: "/" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send({ status: "error", message: "Internal server error" });
  }
}

module.exports = {
  login,
  register,
};