import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons
import '../css/EventPage.css';

const EventPage = () => {
  const location = useLocation();
  const eventId = location.state.eventId;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("Trying to fetch event with ID:", eventId);
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
        console.log('Event fetched:', response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="event-page">
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="event-title">{event.name}</h1>
        </div>
      </div>
      <div className="event-details-grid">
        <div className="event-detail">
          <FaUsers className="icon" />
          <p className="detail-label">Registrations -</p>
          <p className="detail-value">{event.registrations}</p>
        </div>
        <div className="event-detail">
          <FaUsers className="icon" />
          <p className="detail-label">Organizer Club -</p>
          <p className="detail-value">{event.organizerClub}</p>
        </div>
        <div className="event-detail">
          <FaCalendarAlt className="icon" />
          <p className="detail-label">Date & Time -</p>
          <p className="detail-value">{event.date}, {event.hour}:{event.mins < 10 ? `0${event.mins}` : event.mins}</p>
        </div>
        <div className="event-detail">
          <FaMapMarkerAlt className="icon" />
          <p className="detail-label">Location -</p>
          <p className="detail-value">{event.Eventlocation}</p>
        </div>
      </div>
      <div className="event-description">
        <h2>What's this about ?</h2>
        <p>{event.detailedDiscription}</p>
      </div>
      <button className="register-button">Register</button>
    </div>
  );
};

export default EventPage;
