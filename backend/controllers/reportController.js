const db = require('../db/database');
const sendSMS = require('../utils/sendSMS');

exports.sendWeeklyReports = (req, res) => {
  const query = `
    SELECT
      p.phone,
      c.name AS child_name,
      ap.week,
      COUNT(*) AS total_activities,
      SUM(CASE WHEN ap.verified = TRUE THEN 1 ELSE 0 END) AS verified_activities
    FROM activity_progress ap
    JOIN children c ON ap.child_id = c.id
    JOIN parents p ON c.parent_id = p.id
    WHERE ap.activity_day >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY c.id, ap.week, p.phone
  `;

  db.query(query, async (err, results) => {
    if (err) return res.status(500).json({ error: 'DB query failed' });

    for (const row of results) {
      const smsText = `Hi! Your child ${row.child_name} completed ${row.verified_activities}/${row.total_activities} activities for Week ${row.week}.`;
      await sendSMS(row.phone, smsText);
    }

    res.status(200).json({ message: 'Weekly SMS reports sent via FastAPI.' });
  });
};
