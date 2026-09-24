import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLocations } from "../api/navigationApi.js";

const CATEGORIES = [
  "all",
  "academic",
  "hostel",
  "food",
  "recreation",
  "facility",
  "entrance",
];

export default function SmartSearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocations(query)
      .then(setLocations)
      .catch(() => setLocations([]));
  }, [query]);

  const filtered = locations.filter(
    (loc) => category === "all" || loc.category === category,
  );

  return (
    <section className="search-page">
      <h2>Smart Search</h2>
      <input
        className="search-input"
        placeholder="Search for buildings, blocks, hostels…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="category-pills">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={c === category ? "pill pill-active" : "pill"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="location-results">
        {filtered.map((loc) => (
          <li key={loc.id} className="location-result">
            <span>{loc.name}</span>
            <button
              className="btn-secondary"
              onClick={() => navigate(`/map?to=${loc.id}`)}
            >
              Navigate
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="muted">No locations match your search.</p>
        )}
      </ul>
    </section>
  );
}
