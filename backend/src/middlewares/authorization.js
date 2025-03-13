const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();

// Middleware for verifying Cookies
async function verifyCookie(req) {
  try {
    // Verificar si existe una cookie en los encabezados de la solicitud
    if (!req.headers.cookie) {
      console.error("No cookie found in request headers");
      return false;
    }

    // Extraer la cookie JWT
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="));

    if (!cookieJWT) {
      console.error("JWT cookie not found");
      return false;
    }

    // Decodificar el token JWT
    const decoded = jwt.verify(cookieJWT.slice(4), process.env.JWT_SECRET_KEY);

    // Buscar al usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true, profileImg: true},
    });

    if (!user) {
      console.error("User not found in database");
      return false;
    }

    // Validar que los datos del usuario estén completos
    if (!user.name || !user.email || !user.username) {
      console.error("Incomplete user data in database");
      return false;
    }

    // Adjuntar los datos del usuario al objeto de solicitud
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      profileImg: user.profileImg?.url || 'https://via.placeholder.com/150',
      darkMode: user.darkMode || false
    };

    console.log("Middleware req.user:", req.user); // Depuración
    return true;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("JWT token has expired");
    } else if (err.name === "JsonWebTokenError") {
      console.error("Invalid JWT token");
    } else {
      console.error("Error during cookie verification:", err.message);
    }
    return false;
  }
}

// Middleware for authenticated users
async function onlyUser(req, res, next) {
  const authenticated = await verifyCookie(req);
  if (!authenticated) {
    console.error("Authentication failed"); // Depuración
    return res.status(401).json({ status: "error", message: "Unauthorized. Please log in." });
  }
  console.log("Middleware onlyUser passed successfully"); // Depuración
  return next();
}

// Middleware for Admin user
async function onlyAdmin(req, res, next) {
  const authenticated = await verifyCookie(req);
  if (!authenticated) {
    return res.status(401).json({ status: "error", message: "Unauthorized. Please log in." });
  }

  // Verificar que el usuario tenga el rol de administrador
  if (!req.user || req.user.role.name !== "admin") {
    return res.status(403).json({ status: "error", message: "Forbidden. Admin access required." });
  }

  return next();
}

module.exports = {
  onlyUser,
  onlyAdmin,
};