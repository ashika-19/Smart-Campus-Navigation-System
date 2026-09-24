import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/map", label: "Campus Map" },
  { to: "/multi-stop", label: "Multi-Stop" },
  { to: "/search", label: "Search" },
  { to: "/events", label: "Events" },
  { to: "/lost", label: "Lost Mode" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">Smart Campus Navigation</div>
      <nav className="navbar-links">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
