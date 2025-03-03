# 🚀 IA Tools Platform

**License**  
**PRs Welcome**

Welcome to **IA Tools Platform**, a web application designed to showcase popular Artificial Intelligence tools, allow users to interact with them, and track their usage. This project is built using modern technologies like **React**, **Node.js**, **Express**, and **Prisma**, ensuring scalability, performance, and ease of use.

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#-usage)
  - [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Screenshots (Optional)](#-screenshots-optional)

---

## 🌟 Overview

The **IA Tools Platform** is a full-stack web application that allows users to:

- **Discover and explore** popular AI tools categorized by functionality.
- **Save favorite tools** for quick access.
- **Track usage history** and leave reviews.
- **Access premium features** based on user roles (Admin, Premium, Free).

This platform is ideal for developers, researchers, and enthusiasts who want to stay updated with the latest AI tools and trends.

---

## ✨ Features

### Core Features
- **User Authentication**: Secure login and registration with role-based access control (Admin, Premium, Free).
- **Tool Management**: Admins can add, edit, and delete AI tools.
- **Favorites**: Users can mark tools as favorites for easy access.
- **Usage Logs**: Track how users interact with tools.
- **Reviews**: Leave ratings and comments on tools.

### Optional Features
- **Premium Tools**: Access exclusive tools for Premium users.
- **Notifications**: Notify users about updates or new tools.
- **Analytics Dashboard**: Visualize usage statistics and trends.

---

## 💻 Tech Stack

### Frontend
- **React**: Modern JavaScript library for building user interfaces.
- **Vite**: Fast build tool for React development.
- **Axios**: HTTP client for API communication.
- **Tailwind CSS / Material-UI**: Styling frameworks for responsive design.

### Backend
- **Node.js + Express**: Robust backend framework for handling APIs.
- **Prisma**: Modern ORM for database management.
- **MySQL / PostgreSQL**: Relational database for storing data.

### DevOps
- **pnpm**: Efficient package manager for managing dependencies.
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment.
- **Railway / Vercel**: Hosting platforms for production deployment.

## 📂 Project Structure
```yaml
mi-proyecto/
├── pnpm-workspace.yaml        # Workspace configuration for pnpm
├── backend/                   # Backend folder
│   ├── prisma/                # Prisma schema and migrations
│   ├── .env                   # Environment variables
│   ├── index.js               # Entry point for the backend
│   └── package.json           # Backend dependencies and scripts
├── frontend/                  # Frontend folder
│   ├── src/                   # React source code
│   ├── public/                # Static assets
│   ├── package.json           # Frontend dependencies and scripts
│   └── vite.config.js         # Vite configuration
└── INSTRUCTIONS.md            # Project documentation

```
## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **pnpm** (v7 or higher)
- **MySQL / PostgreSQL** (for the database)
- **Git** (optional, for version control)

### Installation

#### Clone the Repository
```bash
git clone https://github.com/yourusername/ia-tools-platform.git
cd ia-tools-platform
```
Install Dependencies
```bash
pnpm install
```
Set Up Environment Variables
Create a .env file in the backend folder and add your database credentials:

```env
DATABASE_URL="mysql://user:password@localhost:3306/ia_tools_db"
JWT_SECRET="your_jwt_secret"
```
Run Database Migrations
```bash
cd backend
npx prisma migrate dev --name init
```
Start the Development Server
```bash
pnpm run dev
```
## 🛠️ Usage
### Backend
The backend runs on http://localhost:3000 by default.
Use tools like Postman or Insomnia to test the APIs.
### Frontend
The frontend runs on http://localhost:5173 by default.
Open the URL in your browser to interact with the app.
## 🌐 API Endpoints
/auth/register (POST): Register a new user.
/auth/login (POST): Authenticate a user.
/tools (GET): Fetch all tools.
/tools/favorites (GET): Fetch user's favorite tools.
/tools/reviews (POST): Add a review for a tool.
## 🤝 Contributing
We welcome contributions from the community! Here’s how you can help:

Fork the repository.
```bash
git clone https://github.com/yourusername/ia-tools-platform.git
```
Create a new branch:
```bash
git checkout -b feature/YourFeatureName
```
Commit your changes:
```bash
git commit -m "Add some feature"
```
Push to the branch:
```bash
git push origin feature/YourFeatureName
```
Open a pull request.
For major changes, please open an issue first to discuss what you’d like to change.

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments
Inspired by the growing need for centralized AI tool discovery platforms.
Built with ❤️ using modern web technologies.