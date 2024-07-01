const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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
  image:String,
  Eventlocation:String,
  detailedDiscription:String,
});

const Event = mongoose.model("Event", eventSchema, "events");

mongoose
  .connect("mongodb://localhost:27017/eventsDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send(err);
  }
});

app.get("/api/events/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.warn("Invalid event ID:", req.params.id);
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      console.warn("Event not found for ID:", req.params.id);
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
