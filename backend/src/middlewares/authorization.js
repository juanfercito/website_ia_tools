const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();

// Middleware for verifying Cookies
async function verifyCookie(req) {
  try {
    if (!req.headers.cookie) return false; // Verify if cookie exists
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="));
    if (!cookieJWT) return false; // Verifica if "jwt" cookie exists
    const decoded = jwt.verify(cookieJWT.slice(4), process.env.JWT_SECRET_KEY);

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true },
    });

    if (!user) {
      return false;
    }

    req.user = user; // Add user to request
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

// Middleware for Admin user
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