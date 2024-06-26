const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    hour: Number,
    mins: Number,
    description: String,
    registrations: Number,
    organizerClub: String,
    images: [
      {
        url: String,
        description: String
      }
    ]
  });
  

const Event = mongoose.model('Event', eventSchema, 'events'); // 'events' is the collection name


mongoose.connect('mongodb://localhost:27017/eventsDB')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));


app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
