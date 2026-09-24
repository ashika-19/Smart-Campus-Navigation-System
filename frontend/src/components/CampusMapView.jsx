const CATEGORY_COLORS = {
  academic: "#2563eb",
  hostel: "#db2777",
  food: "#f59e0b",
  recreation: "#16a34a",
  facility: "#7c3aed",
  entrance: "#0f172a",
  landmark: "#0891b2",
  path: "#94a3b8",
};

const CATEGORY_LABELS = {
  academic: "Academic",
  hostel: "Hostel",
  food: "Food & Café",
  recreation: "Recreation",
  facility: "Facility",
  entrance: "Entrance",
  landmark: "Landmark",
};

/**
 * SVG rendering of the campus graph.
 * `locations` = array of {id, name, x, y, category}
 * `edges`     = optional array of {from, to, blocked} — draws the base
 *               road network in the background (needs the full node
 *               list to resolve from/to into coordinates)
 * `allNodes`  = full node list (for edge coordinate lookup) — pass this
 *               even when `locations` is filtered/partial
 * `route`     = ordered array of node objects (the highlighted path)
 */
export default function CampusMapView({
  locations = [],
  allNodes = locations,
  edges = [],
  route = [],
}) {
  const routeIds = new Set((route || []).map((n) => n.id));
  const nodeById = new Map(allNodes.map((n) => [n.id, n]));

  return (
    <div className="campus-map-wrap">
      <svg viewBox="0 0 850 545" className="campus-svg">
        {/* background road network */}
        {edges.map((edge, i) => {
          const a = nodeById.get(edge.from);
          const b = nodeById.get(edge.to);
          if (!a || !b) return null;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={edge.blocked ? "road-line road-blocked" : "road-line"}
            />
          );
        })}

        {/* highlighted route, drawn on top */}
        {route && route.length > 1 && (
          <polyline
            points={route.map((n) => `${n.x},${n.y}`).join(" ")}
            className="route-line"
          />
        )}

        {/* nodes */}
        {locations.map((loc) => {
          const isActive = routeIds.has(loc.id);
          const color = CATEGORY_COLORS[loc.category] || "#94a3b8";
          return (
            <g
              key={loc.id}
              transform={`translate(${loc.x}, ${loc.y})`}
              className="map-node-group"
            >
              {isActive && (
                <circle r="11" className="node-halo" style={{ fill: color }} />
              )}
              <circle
                r={isActive ? 7 : 5.5}
                style={{ fill: color }}
                className="node-dot"
              />
              <text
                x="9"
                y="-8"
                className={
                  isActive ? "node-label node-label-active" : "node-label"
                }
              >
                {loc.name}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="map-legend">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <div className="legend-item" key={key}>
            <span
              className="legend-dot"
              style={{ background: CATEGORY_COLORS[key] }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
