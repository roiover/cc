// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // for Node <18, optional in Node >=18
const path = require('path');

const app = express();
app.use(cors());

// Proxy endpoint
app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const data = await response.json();
      res.json(data);
    } else {
      const text = await response.text();
      res.send(text);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Serve React build (production)
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// React Router fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
