const db = require("../db/database");

// Find a parent by email
exports.findParentByEmail = (email, callback) => {
  db.query("SELECT * FROM parents WHERE email = ?", [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // Returns a single parent
  });
};

// Create a new parent
exports.createParent = (
  name,
  phone,
  email,
  passwordHash,
  languagePref,
  callback
) => {
  console.log("Creating parent:", {
    name,
    phone,
    email,
    passwordHash,
    languagePref,
  });
  db.query(
    "INSERT INTO parents (name, phone, email, password_hash, language_pref) VALUES (?, ?, ?, ?, ?)",
    [name, phone, email, passwordHash, languagePref],
    (err, results) => {
      if (err) return callback(err);
      callback(null, { id: results.insertId });
    }
  );
};

// Get a parent by ID
exports.getParentById = (id, callback) => {
  db.query("SELECT * FROM parents WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // Returns a single parent
  });
};

// Update a parent's details
exports.updateParent = (id, name, phone, email, languagePref, callback) => {
  console.log("Updating parent:", { id, name, phone, email, languagePref });
  db.query(
    "UPDATE parents SET name = ?, phone = ?, email = ?, language_pref = ? WHERE id = ?",
    [name, phone, email, languagePref, id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.affectedRows > 0); // True if a row was updated
    }
  );
};

// Delete a parent by ID
exports.deleteParent = (id, callback) => {
  console.log("Deleting parent with ID:", id);
  db.query("DELETE FROM parents WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results.affectedRows > 0); // True if a row was deleted
  });
};
