const db = require('../db/database');

exports.submitFeedback = (req, res) => {
  const {
    child_id,
    activity_day,
    activity_id,
    activity_title,
    level_id,
    month,
    week,
    feedback_text,
    feedback_image_url,
    feedback_voice_url,
    submitted_by,
  } = req.body;

  db.run(
    `INSERT INTO activity_progress (
      child_id, activity_day, activity_id, activity_title,
      level_id, month, week, feedback_text,
      feedback_image_url, feedback_voice_url, submitted_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      child_id,
      activity_day,
      activity_id,
      activity_title,
      level_id,
      month,
      week,
      feedback_text,
      feedback_image_url || null,
      feedback_voice_url || null,
      submitted_by,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to submit feedback' });
      }
      res.status(201).json({ message: 'Feedback submitted successfully' });
    }
  );
};
