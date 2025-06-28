require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

app.get('/token', (req, res) => {
  res.json({ token: process.env.DEEPGRAM_API_KEY });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
