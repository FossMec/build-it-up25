import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const baseUrl = "http://localhost:3000/api";

  const [eventName, setEventName] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [date, setDate] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${baseUrl}/events`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents()
  },[])

  return (
    <div>
      <h1>Admin - Events</h1>

      <form>
        <input
          type="text"
          placeholder="event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          placeholder="organizer name"
          value={organizerName}
          onChange={(e) => setOrganizerName(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};
