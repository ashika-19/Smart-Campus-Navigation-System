import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CampusMapPage from "./pages/CampusMapPage.jsx";
import MultiStopPage from "./pages/MultiStopPage.jsx";
import SmartSearchPage from "./pages/SmartSearchPage.jsx";
import EventNavigationPage from "./pages/EventNavigationPage.jsx";
import LostModePage from "./pages/LostModePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<CampusMapPage />} />
          <Route path="/multi-stop" element={<MultiStopPage />} />
          <Route path="/search" element={<SmartSearchPage />} />
          <Route path="/events" element={<EventNavigationPage />} />
          <Route path="/lost" element={<LostModePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}
