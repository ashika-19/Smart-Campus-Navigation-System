import { useEffect, useState } from "react";
import { fetchLocations, fetchRoute } from "../api/navigationApi.js";
import { campusEdges } from "../data/campusEdges.js";
import CampusMapView from "../components/CampusMapView.jsx";

export default function LostModePage() {
  const [locations, setLocations] = useState([]);
  const [currentSpot, setCurrentSpot] = useState("workshop_block");
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(() => {});
  }, []);

  async function handleGetMeBack() {
    setError("");
    try {
      const result = await fetchRoute(currentSpot, "main_gate");
      setRoute(result);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="map-page">
      <aside className="map-sidebar lost-mode">
        <h2>Lost Mode</h2>
        <p className="warning-banner">
          You seem to be off your route! Don't worry, we'll guide you back.
        </p>

        <label>Your current location</label>
        <select
          value={currentSpot}
          onChange={(e) => setCurrentSpot(e.target.value)}
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        <button className="btn-primary" onClick={handleGetMeBack}>
          Take Me Back to Route
        </button>

        {error && <p className="error-text">{error}</p>}

        {route && (
          <div className="route-summary">
            <p>
              <strong>Route back:</strong>{" "}
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
