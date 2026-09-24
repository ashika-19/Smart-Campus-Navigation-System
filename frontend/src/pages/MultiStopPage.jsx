import { useEffect, useState } from "react";
import { fetchLocations, fetchMultiStopRoute } from "../api/navigationApi.js";
import { campusEdges } from "../data/campusEdges.js";
import CampusMapView from "../components/CampusMapView.jsx";

export default function MultiStopPage() {
  const [locations, setLocations] = useState([]);
  const [from] = useState("main_gate");
  const [stops, setStops] = useState([]);
  const [pendingStop, setPendingStop] = useState("");
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(() => setError("Could not load locations."));
  }, []);

  function addStop() {
    if (pendingStop && !stops.includes(pendingStop)) {
      setStops([...stops, pendingStop]);
      setPendingStop("");
    }
  }

  function removeStop(id) {
    setStops(stops.filter((s) => s !== id));
  }

  async function handleNavigate() {
    setError("");
    try {
      const result = await fetchMultiStopRoute(from, stops);
      setRoute(result);
    } catch (err) {
      setError(err.message);
      setRoute(null);
    }
  }

  const nameOf = (id) => locations.find((l) => l.id === id)?.name || id;

  return (
    <section className="map-page">
      <aside className="map-sidebar">
        <h2>Multi-Stop Navigation</h2>
        <p className="muted">Start: {nameOf(from)}</p>

        <label>Add a stop</label>
        <select
          value={pendingStop}
          onChange={(e) => setPendingStop(e.target.value)}
        >
          <option value="">Select a location…</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
        <button className="btn-secondary" onClick={addStop}>
          Add Stop
        </button>

        <ol className="stop-list">
          {stops.map((s, idx) => (
            <li key={s}>
              {idx + 1}. {nameOf(s)}
              <button className="btn-link" onClick={() => removeStop(s)}>
                remove
              </button>
            </li>
          ))}
        </ol>

        <button
          className="btn-primary"
          disabled={stops.length === 0}
          onClick={handleNavigate}
        >
          Start Navigation
        </button>

        {error && <p className="error-text">{error}</p>}

        {route && (
          <div className="route-summary">
            <p>
              <strong>Optimized order:</strong>{" "}
              {route.order.map(nameOf).join(" → ")}
            </p>
            <p>
              <strong>Total distance:</strong> {route.distance} units
            </p>
          </div>
        )}
      </aside>

      <div className="map-canvas">
        <CampusMapView
          locations={locations}
          allNodes={locations}
          edges={campusEdges}
          route={route?.path}
        />
      </div>
    </section>
  );
}
