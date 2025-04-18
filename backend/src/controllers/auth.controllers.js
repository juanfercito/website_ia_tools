const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const redisClient = require("../config/redis");
const { addToBlacklist } = require("../middlewares/tokenBlacklist");

dotenv.config();

const prisma = new PrismaClient();

async function login(req, res) {
  console.log('req.body received', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ status: "error", message: "All fields are required" });
  }

  try {
    // Find User by email for Request
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true, profileImg: true }, // Include Role and Profile Image
    });

    if (!user) {
      return res.status(400).send({ status: "error", message: "Invalid credentials" });
    }

    // Verify and validate the password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ status: "error", message: "Invalid credentials" });
    }

    // Generate the JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        username: user.username, 
        role: user.role.name,
        profilePicture: user.profileImg?.url || "https://via.placeholder.com/150",
        darkMode: user.darkMode || false
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Configure the cookie
    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only in production if uses HTTPS
      sameSite: "lax", // Protection against CSRF
      path: "/", // global cookie route
    };
    
    res.cookie("jwt", token, cookieOption);

    // Redirect by User Role
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
    // Verify by username if User already registered 
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return res.status(400).send({ status: "error", message: "Username already exists" });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Obtain the Default Role ("freeUser")
    const defaultRole = await prisma.role.findUnique({
      where: { name: "freeUser" }, // Buscar el rol por su nombre
    });

    if (!defaultRole) {
      return res.status(500).send({ status: "error", message: "Default role not found" });
    }

    // Create the New User
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

async function allUsers(req, res) {
  try {
    // Using cache data
    if (req.cacheUser) {
      console.log('loading to cache');
      return res.json(req.cacheUser);
    };

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }, // Find the User by ID
      include: { role: true, profileImg: true }, // Include Role and Profile Img
    });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Validate all the fields for permissions
    if (!user.name || !user.email || !user.username || !user.role) {
      return res.status(500).json({ status: "error", message: "Incomplete user data in database" });
    }

    // If OK, return the user data dictionary
    const userData ={
      status: "ok",
      user: {
        id: user.id,
        name: user.name || "Unknown",
        email: user.email || "Unknown",
        username: user.username || "Unknown",
        role: user.role.name || "Unknown",
        profilePicture: user.profileImg?.url || "/default-avatar.png",
        darkMode: user.darkMode || false
      },
    };

    // Save in cache if not exists
    await redisClient.set(`user:${user.id}`, JSON.stringify(userData),
      console.log('saved in cache')
    );

    // Return the user data dictionary
    return res.json(userData);

  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

async function adminUser(req, res) {
  try {
    // Using cache data
    if (req.cacheUser) {
      console.log('loading to cache');
      return res.json(req.cacheUser);
    };

    const admin = await prisma.user.findUnique({
      where: { id: req.user.id }, // Find the Admin User by ID
      include: { role: true, profileImg: true }, // Include Role and Profile Img
    });

    if (!admin) {
      return res.status(404).json({ status: "error", message: "Admin not found" });
    }

    // Validate all the fields for permissions
    if (!admin.name || !admin.email || !admin.username || !admin.role) {
      return res.status(500).json({ status: "error", message: "Incomplete admin data in database" });
    }

    const adminData ={
      status: "ok",
      user: { // Important: Use 'User' on response instead of 'Admin' for match with frontend
        id: admin.id,
        name: admin.name || "Unknown",
        email: admin.email || "Unknown",
        username: admin.username || "Unknown",
        role: admin.role.name || "Unknown",
        profilePicture: admin.profileImg?.url || "/default-avatar.png",
        darkMode: admin.darkMode || false,
      },
    };

    // Save in cache if not exists
    await redisClient.set(`user:${admin.id}`, JSON.stringify(adminData),
      console.log('saved in cache')
    );
    // Return the admin data dictionary
    return res.json(adminData);

  } catch (error) {
    console.error("Error fetching admin data:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: "error", message: "No token provided" });
    }
    await addToBlacklist(token);
    // Clean the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only in production if uses HTTPS
      sameSite: "lax", // It must be the same with the cookie
      path: "/", // It must be the same with the cookie when configure the path
    });

    // Return response
    return res.json({ status: "ok", message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

module.exports = {
  login,
  register,
  allUsers,
  adminUser,
  logout,
};