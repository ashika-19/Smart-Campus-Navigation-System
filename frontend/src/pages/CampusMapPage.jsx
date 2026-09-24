import { useEffect, useState } from "react";
import { fetchLocations, fetchRoute } from "../api/navigationApi.js";
import CampusMapView from "../components/CampusMapView.jsx";
import { campusEdges } from "../data/campusEdges.js";
export default function CampusMapPage() {
  const [locations, setLocations] = useState([]);
  const [from, setFrom] = useState("main_gate");
  const [to, setTo] = useState("j_block_library");
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(() => setError("Could not load locations."));
  }, []);

  async function handleNavigate() {
    setError("");
    try {
      const result = await fetchRoute(from, to);
      setRoute(result);
    } catch (err) {
      setError(err.message);
      setRoute(null);
    }
  }

  return (
    <section className="map-page">
      <aside className="map-sidebar">
        <h2>Navigation</h2>

        <label>You are here</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        <label>Destination</label>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        <button className="btn-primary" onClick={handleNavigate}>
          Start Navigation
        </button>

        {error && <p className="error-text">{error}</p>}

        {route && (
          <div className="route-summary">
            <p>
              <strong>Distance:</strong> {route.distance} units
            </p>
            <p>
              <strong>Stops:</strong>{" "}
              {route.path.map((n) => n.name).join(" → ")}
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
