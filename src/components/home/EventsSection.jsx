import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useFetch from "../../hooks/useFetch";
import API_BASE from "../../config";

function SkeletonCard({ T }) {
  return (
    <div style={{ background: T.bg, borderRadius: 22, boxShadow: T.shadow, padding: "1.5rem" }}>
      {[80, 120, 60, 40].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? 36 : 14, width: `${w}%`, borderRadius: 8,
          background: T.bg2, marginBottom: 12,
          animation: "pulse 1.4s ease-in-out infinite",
        }} />
      ))}
    </div>
  );
}

export default function EventsSection() {
  const { T } = useTheme();
  const { data: events, loading, error } = useFetch(`${API_BASE}/api/games`);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="events-section" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 8 }}>WHAT'S ON</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(2rem,5vw,2.8rem)", color: T.text, lineHeight: 1.1 }}>Games & Events</h2>
        <p style={{ color: T.text2, marginTop: 10, fontWeight: 600 }}>Pick your battle. Register before slots fill up!</p>
      </div>

      {error && (
        <div style={{ textAlign: "center", padding: "3rem", color: T.accent, fontWeight: 700 }}>
          ⚠️ Failed to load events — {error}
        </div>
      )}

      <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {loading
          ? Array(12).fill(0).map((_, i) => <SkeletonCard key={i} T={T} />)
          : events?.map((ev, i) => (
            <div key={ev._id}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                background: T.bg, borderRadius: 22, boxShadow: T.shadow,
                padding: "1.5rem",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.25s", position: "relative", overflow: "hidden",
              }}>
              <div style={{ position: "absolute", top: -10, right: -10, width: 80, height: 80, background: `radial-gradient(circle, ${T.accent}18, transparent)`, borderRadius: "50%" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: "2.2rem" }}>{ev.icon}</span>
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: 1, padding: "4px 10px", borderRadius: 999,
                  background: ev.tag === "Team" ? T.teamBg : T.soloBg,
                  color: ev.tag === "Team" ? T.teamColor : T.accent,
                  boxShadow: T.shadowInSm,
                }}>{ev.tag}</span>
              </div>
              <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.15rem", color: T.text, marginBottom: 10 }}>{ev.name}</div>
              <div style={{ fontSize: 12, color: T.text2, fontWeight: 600, lineHeight: 1.9 }}>
                <div>📅 {ev.date}</div>
                <div>📍 {ev.venue}</div>
              </div>
              <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ background: T.bg, borderRadius: 10, boxShadow: T.shadowInSm, padding: "5px 12px", fontSize: 11, fontWeight: 800, color: T.text2 }}>
                  {ev.slots} slots
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: 1, padding: "3px 8px", borderRadius: 999,
                  background: ev.status === "Open" ? "#e8f5e9" : ev.status === "In Progress" ? "#fff8e1" : "#fce4ec",
                  color: ev.status === "Open" ? "#2e7d32" : ev.status === "In Progress" ? "#f57f17" : "#c62828",
                }}>{ev.status}</span>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}