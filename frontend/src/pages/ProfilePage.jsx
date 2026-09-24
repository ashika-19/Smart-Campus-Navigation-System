// Placeholder saved-routes data — replace with real user data once
// auth + a database (e.g. MongoDB/PostgreSQL) are wired up.
const SAVED_ROUTES = [
  { id: 1, name: "Home to CSE Department", distance: "1.2 km" },
  { id: 2, name: "Library to Cafeteria", distance: "0.5 km" },
  { id: 3, name: "Morning Classes", distance: "0.8 km" },
];

export default function ProfilePage() {
  return (
    <section className="profile-page">
      <div className="profile-header">
        <div className="avatar-placeholder">A</div>
        <div>
          <h2>Ashika</h2>
          <button className="btn-link">Edit Profile</button>
        </div>
      </div>

      <h3>Saved Routes</h3>
      <ul className="saved-routes">
        {SAVED_ROUTES.map((route) => (
          <li key={route.id} className="saved-route">
            <span>{route.name}</span>
            <span className="muted">{route.distance}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
