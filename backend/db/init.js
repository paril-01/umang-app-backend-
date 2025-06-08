// db/init.js
const db = require('./database');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS parents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT UNIQUE,
      email TEXT UNIQUE,
      password_hash TEXT,
      language_pref TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS children (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parent_id INTEGER,
      name TEXT,
      dob DATE,
      gender TEXT,
      photo_url TEXT,
      current_level INTEGER,
      current_month INTEGER,
      current_week INTEGER,
      FOREIGN KEY(parent_id) REFERENCES parents(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS activity_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      child_id INTEGER,
      activity_day DATE,
      activity_id INTEGER,
      activity_title TEXT,
      level_id INTEGER,
      month INTEGER,
      week INTEGER,
      feedback_text TEXT,
      feedback_image_url TEXT,
      feedback_voice_url TEXT,
      submitted_by TEXT,
      verified BOOLEAN DEFAULT FALSE,
      FOREIGN KEY(child_id) REFERENCES children(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parent_id INTEGER,
      content TEXT,
      category TEXT,
      delivery_mode TEXT,
      scheduled_time TEXT,
      FOREIGN KEY(parent_id) REFERENCES parents(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS volunteers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      email TEXT,
      area_code TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS visit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      volunteer_id INTEGER,
      area_code TEXT,
      dated TEXT,
      img TEXT,
      child_id INTEGER,
      session_feedback TEXT,
      comments TEXT,
      FOREIGN KEY(volunteer_id) REFERENCES volunteers(id),
      FOREIGN KEY(child_id) REFERENCES children(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS levels (
      level_id INTEGER PRIMARY KEY,
      level_name TEXT,
      age_range TEXT,
      month INTEGER,
      week INTEGER,
      theme TEXT,
      date_range TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS learning_resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level_id INTEGER,
      title TEXT,
      type TEXT,
      url TEXT,
      FOREIGN KEY(level_id) REFERENCES levels(level_id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS activities (
      activity_id INTEGER PRIMARY KEY,
      level_id INTEGER,
      activity_day DATE,
      time TEXT,
      title TEXT,
      material TEXT,
      domain TEXT,
      milestone TEXT,
      video_link TEXT,
      image_link TEXT,
      FOREIGN KEY(level_id) REFERENCES levels(level_id)
    )
  `);

  console.log('All tables initialized.');
});
