import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "◫"
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: "▣"
  }
];

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [reportRequested, setReportRequested] = useState(false);

  const handleReportsClick = () => {
    if (activeView !== "dashboard") {
      setActiveView("dashboard");
    }

    setReportRequested(true);
  };

  return (
    <div className="portal-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">A</div>

          <div className="brand-text">
            <span className="brand-kicker">AURA</span>
            <strong>ENGINE</strong>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${activeView === item.id ? "active" : ""}`}
              onClick={() => setActiveView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-panel">
          <p className="panel-label">Operations</p>
          <strong>System Healthy</strong>
          <span>99.8% uptime across all inventory nodes</span>
        </div>
      </aside>

      <div className="main-panel">
        <header className="topbar">
          <div>
            <p className="topbar-kicker">PORTAL</p>
            <h2>{activeView === "dashboard" ? "Command Center" : "Inventory Workspace"}</h2>
          </div>

          <div className="topbar-actions">
            <button type="button" className="ghost-button" onClick={handleReportsClick}>
              Reports
            </button>

            <div className="user-badge">
              <span>AS</span>
            </div>
          </div>
        </header>

        <div className="content-shell">
          {activeView === "dashboard" ? (
            <Dashboard
              reportRequested={reportRequested}
              onReportHandled={() => setReportRequested(false)}
            />
          ) : (
            <Inventory />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;