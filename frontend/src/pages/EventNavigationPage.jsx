import { useNavigate } from "react-router-dom";

// Placeholder events — wire this up to a real events API/admin panel later.
const EVENTS = [
  {
    id: "techfest",
    name: "Tech Fest 2026",
    date: "20 May 2026, 10:00 AM",
    venue: "Seminar Hall",
    locationId: "j_block_library",
  },
  {
    id: "sportsmeet",
    name: "Annual Sports Meet",
    date: "30 May 2026, 9:00 AM",
    venue: "Sports Complex",
    locationId: "playground",
  },
  {
    id: "careerguidance",
    name: "Career Guidance Seminar",
    date: "5 June 2026, 11:00 AM",
    venue: "Auditorium",
    locationId: "indoor_auditorium",
  },
];

export default function EventNavigationPage() {
  const navigate = useNavigate();

  return (
    <section className="events-page">
      <h2>Upcoming Events</h2>
      <ul className="event-list">
        {EVENTS.map((event) => (
          <li key={event.id} className="event-card">
            <div>
              <strong>{event.name}</strong>
              <p className="muted">{event.date}</p>
              <p className="muted">{event.venue}</p>
            </div>
            <button
              className="btn-primary"
              onClick={() => navigate(`/map?to=${event.locationId}`)}
            >
              Navigate
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
