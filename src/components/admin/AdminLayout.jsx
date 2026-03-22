import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const NAV = [
  { icon: "📊", label: "Dashboard",     path: "/admin/dashboard" },
  { icon: "📋", label: "Registrations", path: "/admin/registrations" },
  { icon: "🏅", label: "Events",        path: "/admin/events" },
  { icon: "💰", label: "Sponsors",      path: "/admin/sponsors" },
];

const A = { bg: "#0f1117", surface: "#1a1d2e", border: "#2a2d42", text: "#e8eaf5", text2: "#6b7280", accent: "#ff6b3d", accent2: "#ffb347" };

export default function AdminLayout({ children }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const go = (path) => { navigate(path); setSidebarOpen(false); };

  const Sidebar = () => (
    <div style={{
      width: 240, background: A.surface, borderRight: `1px solid ${A.border}`,
      display: "flex", flexDirection: "column", height: "100vh",
      position: "sticky", top: 0, flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "1.5rem", borderBottom: `1px solid ${A.border}` }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: `linear-gradient(135deg, ${A.accent}22, ${A.accent2}11)`,
          borderRadius: 14, padding: "10px 14px",
          border: `1px solid ${A.accent}33`,
        }}>
          <span style={{ fontSize: "1.2rem" }}>🛡️</span>
          <div>
            <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: "0.95rem", color: A.accent, letterSpacing: 1 }}>ADMIN</div>
            <div style={{ fontSize: 10, color: A.text2, fontWeight: 700, letterSpacing: 1 }}>SPORTSDAY26</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "1rem 0.75rem", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map(({ icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button key={path} onClick={() => go(path)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 14px", borderRadius: 12, border: "none", cursor: "pointer",
              background: active ? `linear-gradient(135deg, ${A.accent}22, ${A.accent2}11)` : "transparent",
              color: active ? A.accent : A.text2,
              fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800,
              borderLeft: active ? `3px solid ${A.accent}` : "3px solid transparent",
              transition: "all 0.2s", textAlign: "left", width: "100%",
            }}>
              <span style={{ fontSize: "1.1rem" }}>{icon}</span>
              {label}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "1rem 0.75rem", borderTop: `1px solid ${A.border}` }}>
        <button onClick={() => { go("/"); }} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px", borderRadius: 12, border: "none", cursor: "pointer",
          background: "transparent", color: A.text2,
          fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700,
          width: "100%", marginBottom: 6, transition: "color 0.2s",
        }}>↗ View Site</button>
        <button onClick={logout} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px", borderRadius: 12, border: "none", cursor: "pointer",
          background: "#ff6b3d11", color: A.accent,
          fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800,
          width: "100%", border: `1px solid ${A.accent}22`, transition: "all 0.2s",
        }}>🚪 Sign Out</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: A.bg, fontFamily: "'Nunito', sans-serif", color: A.text }}>
      {/* Desktop sidebar */}
      <div className="admin-sidebar-desktop">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
          <div onClick={() => setSidebarOpen(false)} style={{ position: "absolute", inset: 0, background: "#00000080" }} />
          <div style={{ position: "relative", zIndex: 101 }}><Sidebar /></div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        {/* Mobile topbar */}
        <div className="admin-topbar" style={{
          display: "none", padding: "1rem 1.5rem",
          background: A.surface, borderBottom: `1px solid ${A.border}`,
          alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "'Black Ops One', cursive", color: A.accent, fontSize: "1.1rem" }}>SPORTSDAY26</span>
          <button onClick={() => setSidebarOpen(true)} style={{
            background: A.bg, border: `1px solid ${A.border}`, borderRadius: 10,
            padding: "8px 12px", color: A.text, cursor: "pointer", fontSize: "1.1rem",
          }}>☰</button>
        </div>

        <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Black+Ops+One&family=Righteous&display=swap');
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}