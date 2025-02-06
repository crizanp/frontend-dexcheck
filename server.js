const express = require('express');
const fetch = require('node-fetch-commonjs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/coins/:id', async (req, res) => {
  try {
    const apiResponse = await fetch(`https://frontend-api.pump-mirror.fun/coins/${req.params.id}`);
    if (!apiResponse.ok) throw new Error('API responded with an error');

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
