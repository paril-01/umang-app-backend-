const express = require('express');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedbackRoutes');
const app = express();
const reportRoutes = require('./routes/reportRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', feedbackRoutes);
app.use('/api/report', reportRoutes);
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
