const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const parentUtils = require("../db/parentUtils");

const saltRounds = 10;

router.post("/signup", (req, res) => {
  const { name, phone, email, password, languagePref } = req.body;

  // Basic validation
  if (!name || !phone || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required for signup." });
  }

  // Check if parent with this email already exists
  parentUtils.findParentByEmail(email, (err, existingParent) => {
    if (err) {
      console.error("Error finding parent by email:", err);
      return res.status(500).json({ message: "Server error during signup." });
    }

    if (existingParent) {
      return res
        .status(409)
        .json({ message: "Parent with this email already exists." });
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, passwordHash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Server error during signup." });
      }

      // Create the new parent
      parentUtils.createParent(
        name,
        phone,
        email,
        passwordHash,
        languagePref,
        (err, result) => {
          if (err) {
            console.error("Error creating parent:", err);
            return res
              .status(500)
              .json({ message: "Failed to create parent account." });
          }
          res.status(201).json({
            message: "Parent account created successfully!",
            parentId: result.id,
          });
        }
      );
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required for login." });
  }

  // Find the parent by email
  parentUtils.findParentByEmail(email, (err, parent) => {
    if (err) {
      console.error("Error finding parent by email:", err);
      return res.status(500).json({ message: "Server error during login." });
    }

    if (!parent) {
      // Use a generic message for security
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the stored hash
    bcrypt.compare(password, parent.password_hash, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Server error during login." });
      }

      if (isMatch) {
        // Passwords match, login successful
        // In a real application, you would generate and send a JWT token here.
        res.status(200).json({
          message: "Login successful!",
          parent: {
            id: parent.id,
            name: parent.name,
            email: parent.email,
            languagePref: parent.language_pref,
            // Do not send password_hash
          },
        });
      } else {
        // Passwords do not match
        return res.status(401).json({ message: "Invalid email or password." });
      }
    });
  });
});

module.exports = router;
