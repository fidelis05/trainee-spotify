const app = require("./config/express-config");

// Start the server only if not in a serverless environment
if (process.env.VERCEL_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app for Vercel