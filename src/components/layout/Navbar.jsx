import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = [
  { label: "Home",    path: "/" },
  { label: "About",   path: "/about" },
  { label: "Events",  path: "/events" },
  { label: "FAQs",    path: "/faqs" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { T, isDark, setIsDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (path) => { navigate(path); setMenuOpen(false); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: T.bg, boxShadow: T.navShadow,
      padding: "0 1.5rem", display: "flex",
      alignItems: "center", justifyContent: "space-between",
      height: 64, transition: "background 0.3s",
    }}>
      {/* Logo */}
      <div onClick={() => go("/")} style={{
        fontFamily: "'Black Ops One', cursive", fontSize: "1.2rem",
        color: T.accent, cursor: "pointer", letterSpacing: 1,
      }}>
        SPORTS<span style={{ color: T.text }}>DAY</span><span style={{ color: T.accent2 }}>26</span>
      </div>

      {/* Desktop links */}
      <div className="desktop-nav" style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {NAV_LINKS.map(({ label, path }) => (
          <button key={path} onClick={() => go(path)} style={{
            background: "none", border: "none",
            fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700,
            color: isActive(path) ? T.accent : T.text2,
            padding: "7px 12px", borderRadius: 999, cursor: "pointer",
            boxShadow: isActive(path) ? T.shadowInSm : "none",
            transition: "all 0.2s",
          }}>{label}</button>
        ))}
        <button onClick={() => go("/register")} style={{
          fontFamily: "'Righteous', cursive", fontSize: 13,
          background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
          color: "#fff", border: "none", borderRadius: 999,
          padding: "8px 18px", cursor: "pointer",
          boxShadow: "4px 4px 14px #d4855866", marginLeft: 6,
        }}>Register →</button>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Dark mode toggle */}
        <button onClick={() => setIsDark(d => !d)} style={{
          background: T.bg, border: "none", borderRadius: 999,
          boxShadow: T.shadowSm, width: 38, height: 38,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "1.1rem",
        }}>{isDark ? "☀️" : "🌙"}</button>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} style={{
          display: "none", background: T.bg, border: "none",
          borderRadius: 10, boxShadow: T.shadowSm,
          width: 38, height: 38, flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 5, cursor: "pointer",
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 18, height: 2, background: T.text, borderRadius: 2,
              transition: "all 0.25s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "scaleX(0)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: T.bg, boxShadow: T.shadow,
          padding: "1rem 1.5rem", zIndex: 300,
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {NAV_LINKS.map(({ label, path }) => (
            <button key={path} onClick={() => go(path)} style={{
              background: isActive(path) ? T.bg2 : "none",
              border: "none", textAlign: "left",
              fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700,
              color: isActive(path) ? T.accent : T.text,
              padding: "10px 14px", borderRadius: 12, cursor: "pointer",
              boxShadow: isActive(path) ? T.shadowInSm : "none",
            }}>{label}</button>
          ))}
          <button onClick={() => go("/register")} style={{
            fontFamily: "'Righteous', cursive", fontSize: 14,
            background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
            color: "#fff", border: "none", borderRadius: 12,
            padding: "11px 18px", cursor: "pointer", marginTop: 4,
          }}>Register Now →</button>
        </div>
      )}
    </nav>
  );
}