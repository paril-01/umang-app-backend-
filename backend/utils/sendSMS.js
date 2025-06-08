const axios = require('axios');

async function sendSMS(to, message) {
  try {
    const response = await axios.post('http://localhost:3001/send-sms', {
      to,
      message,
    });
    console.log('SMS sent:', response.data);
  } catch (error) {
    console.error('Failed to send SMS:', error.message);
  }
}

module.exports = sendSMS;
