import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
import { locations } from './data.js';

app.use(express.json());
app.use(cors());

//Route get
app.get('/weather/:location', (req, res) => {
  const locationName = req.params.location.toLowerCase();
  const locationData = locations.find(loc => loc.name.toLowerCase() === locationName);

  if (locationData) {
    res.status(200).json({ data: locationData, status: 'successful', message: 'Weather data found' });
  } else {
    res.status(404).json({ status: 'error', message: 'Weather data not found for the specified location' });
  }
});

// Route post
app.post('/addweather', (req, res) => {
  const newLocationData = req.body;
  console.log("Data added successfully");
  if (!newLocationData.name || !newLocationData.region || !newLocationData.country || !newLocationData.temp_c || !newLocationData.temp_f || !newLocationData.feelslike_c || !newLocationData.feelslike_f) {
    return res.status(400).json({ status: 'error', message: 'All fields are required' });
  }
  locations.push(newLocationData);
  res.status(201).json({ data: newLocationData, status: 201, message: 'Weather data added successfully' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, message: 'Internal server error' });
});

// server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
