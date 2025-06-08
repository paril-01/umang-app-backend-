const db = require("../db/database");

// Find all children linked to a specific parent ID
exports.findChildrenByParentId = (parentId, callback) => {
  db.query(
    "SELECT * FROM children WHERE parent_id = ?",
    [parentId],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results); // Returns an array of children
    }
  );
};

// Create a new child
exports.createChild = (
  parentId,
  name,
  dob,
  gender,
  photoUrl,
  currentLevel,
  currentMonth,
  currentWeek,
  callback
) => {
  console.log("Creating child for parent ID:", parentId, {
    name,
    dob,
    gender,
    photoUrl,
    currentLevel,
    currentMonth,
    currentWeek,
  });
  db.query(
    "INSERT INTO children (parent_id, name, dob, gender, photo_url, current_level, current_month, current_week) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      parentId,
      name,
      dob,
      gender,
      photoUrl,
      currentLevel,
      currentMonth,
      currentWeek,
    ],
    (err, results) => {
      if (err) return callback(err);
      callback(null, { id: results.insertId });
    }
  );
};

// Get a child by ID
exports.getChildById = (id, callback) => {
  db.query("SELECT * FROM children WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // Returns a single child
  });
};

// Update a child's details
exports.updateChild = (
  id,
  name,
  dob,
  gender,
  photoUrl,
  currentLevel,
  currentMonth,
  currentWeek,
  callback
) => {
  console.log("Updating child:", {
    id,
    name,
    dob,
    gender,
    photoUrl,
    currentLevel,
    currentMonth,
    currentWeek,
  });
  db.query(
    "UPDATE children SET name = ?, dob = ?, gender = ?, photo_url = ?, current_level = ?, current_month = ?, current_week = ? WHERE id = ?",
    [name, dob, gender, photoUrl, currentLevel, currentMonth, currentWeek, id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.affectedRows > 0); // True if a row was updated
    }
  );
};

// Delete a child by ID
exports.deleteChild = (id, callback) => {
  console.log("Deleting child with ID:", id);
  db.query("DELETE FROM children WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results.affectedRows > 0); // True if a row was deleted
  });
};
