require("dotenv").config(); // Load environment variables

const express = require("express");
const app = express();

// CORS configuration
const cors = require("cors");

app.use(
  cors({
    origin: (origin, callback) => {
      // Obtém o domínio real do usuário
      const domain = origin ? new URL(origin).hostname : null;

      const allowedOrigins = [
        "http://localhost:3030",
        "http://localhost:5173",
        "http://127.0.0.1:3030",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
      ];

      // Se o domínio atual for Vercel ou estiver na lista de permitidos, aceita
      if (!origin || allowedOrigins.includes(origin) || domain.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware for parsing cookies and request bodies
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const usersRouter = require("../src/domains/users/controllers/index.js");
const artistsRouter = require("../src/domains/artists/controllers/index.js");
const songsRouter = require("../src/domains/songs/controllers/index.js");
const usersSongsRouter = require("../src/domains/userSongs/controllers/index.js");

app.use("/api/users", usersRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/songs", songsRouter);
app.use("/api/users-songs", usersSongsRouter);

// Error handling middleware
const errorHandler = require("../src/middlewares/error-handler.js");
app.use(errorHandler);

module.exports = app; // Export the app for use in index.js
