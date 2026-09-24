import { useNavigate } from "react-router-dom";

const FEATURES = [
  {
    title: "Smart Search",
    desc: "Find any building or block instantly by name or category.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Multi-Stop Routes",
    desc: "Plan one trip across several destinations, auto-optimized.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M8 18h5a4 4 0 0 0 4-4V9" />
        <path d="M16 6h-5a4 4 0 0 0-4 4v5" />
      </svg>
    ),
  },
  {
    title: "Real-Time Navigation",
    desc: "Turn-by-turn routing powered by Dijkstra, A* and BFS.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
  {
    title: "Event Navigation",
    desc: "Get routed straight to a fest, seminar or sports venue.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Lost Mode",
    desc: "Off your route? One tap brings you back on track.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Mobile Friendly",
    desc: "Built to work smoothly on the phone in your hand.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        <div className="hero-content">
          <span className="hero-badge">
            📍 Rajalakshmi Engineering College · Thandalam
          </span>
          <h1>
            Navigate Your Campus
            <br />
            <span>Smarter, Faster, Easier.</span>
          </h1>
          <p>
            Find any building, block or facility on campus in seconds. Save
            time, skip the confusion, and get where you're going — every time.
          </p>
          <div className="landing-actions">
            <button
              className="btn-primary btn-lg"
              onClick={() => navigate("/map")}
            >
              Start Navigating →
            </button>
            <button
              className="btn-secondary btn-lg"
              onClick={() => navigate("/search")}
            >
              Explore Campus
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <svg viewBox="0 0 320 260" className="hero-map-art">
            <rect
              x="10"
              y="10"
              width="300"
              height="240"
              rx="18"
              fill="#ffffff"
              stroke="#e5e9f2"
            />
            <line
              x1="40"
              y1="200"
              x2="160"
              y2="80"
              stroke="#c7cee3"
              strokeWidth="3"
            />
            <line
              x1="160"
              y1="80"
              x2="270"
              y2="60"
              stroke="#c7cee3"
              strokeWidth="3"
            />
            <line
              x1="160"
              y1="80"
              x2="150"
              y2="180"
              stroke="#c7cee3"
              strokeWidth="3"
            />
            <line
              x1="150"
              y1="180"
              x2="260"
              y2="200"
              stroke="#c7cee3"
              strokeWidth="3"
            />
            <polyline
              points="40,200 160,80 270,60"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="4"
              strokeDasharray="9 6"
              strokeLinecap="round"
            />
            <circle cx="40" cy="200" r="8" fill="#0f172a" />
            <circle cx="160" cy="80" r="7" fill="#2563eb" />
            <circle cx="270" cy="60" r="7" fill="#db2777" />
            <circle cx="150" cy="180" r="6" fill="#f59e0b" />
            <circle cx="260" cy="200" r="6" fill="#16a34a" />
          </svg>
        </div>
      </section>

      <section className="landing-stats">
        <div className="stat">
          <strong>500+</strong>
          <span>Campus Locations</span>
        </div>
        <div className="stat">
          <strong>1000+</strong>
          <span>Active Users</span>
        </div>
        <div className="stat">
          <strong>10+</strong>
          <span>Departments</span>
        </div>
        <div className="stat">
          <strong>24/7</strong>
          <span>Always There</span>
        </div>
      </section>

      <section className="feature-section">
        <h2 className="section-title">Why Choose Smart Campus Navigation?</h2>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <p>
          Smart Campus Navigation System — built for Rajalakshmi Engineering
          College, Thandalam.
        </p>
      </footer>
    </div>
  );
}
