const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();

// Middleware para verificar cookies
async function verifyCookie(req) {
  try {
    if (!req.headers.cookie) return false; // Verifica si hay cookies
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="));
    if (!cookieJWT) return false; // Verifica si existe la cookie "jwt"
    const decoded = jwt.verify(cookieJWT.slice(4), process.env.JWT_SECRET_KEY);

    // Buscar al usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true }, // Incluir el rol del usuario
    });

    if (!user) {
      return false;
    }

    req.user = user; // Adjuntar el usuario al objeto de solicitud
    return true;
  } catch (err) {
    console.error("Error during cookie verification:", err.message);
    return false;
  }
}

// Middleware for authenticated users
async function onlyUser(req, res, next) {
  const authenticated = await verifyCookie(req);
  if (!authenticated) {
    return res.status(401).json({ status: "error", message: "Unauthorized. Please log in." });
  }
  return next();
}

// Middleware para administradores (autenticados y con role === "admin")
async function onlyAdmin(req, res, next) {
  const authenticated = await verifyCookie(req);
  if (!authenticated) {
    return res.status(401).json({ status: "error", message: "Unauthorized. Please log in." });
  }
  if (req.user.role.name !== "admin") {
    return res.status(403).json({ status: "error", message: "Forbidden. Admin access required." });
  }
  return next();
}

module.exports = {
  onlyUser,
  onlyAdmin,
};