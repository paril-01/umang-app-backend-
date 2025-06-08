const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // To parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Routes
app.use("/api/auth", authRoutes); // All auth-related routes will be under /api/auth

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Parent API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
