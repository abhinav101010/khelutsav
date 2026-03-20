import { useState } from "react";
import N from "../../theme";

export default function EventCard({ event }) {
  const [hovered, setHovered] = useState(false);
  const isTeam = event.tag === "Team";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: N.bg, borderRadius: 22,
        boxShadow: hovered
          ? "12px 12px 28px #c5c7cf, -8px -8px 22px #ffffff"
          : N.shadow,
        padding: "1.5rem",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s",
        cursor: "default",
        position: "relative", overflow: "hidden",
      }}>

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -10, right: -10,
        width: 80, height: 80, borderRadius: "50%",
        background: `radial-gradient(circle, ${N.accent}18, transparent)`,
        pointerEvents: "none",
      }} />

      {/* Icon + Tag row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: "2.2rem" }}>{event.icon}</span>
        <span style={{
          fontSize: 10, fontWeight: 800, letterSpacing: 1,
          padding: "4px 10px", borderRadius: 999,
          background: isTeam ? "#e0f0ff" : "#fff0ea",
          color: isTeam ? "#1a6fa8" : N.accent,
          boxShadow: N.shadowInSm,
        }}>{event.tag}</span>
      </div>

      {/* Name */}
      <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.15rem", color: N.text, marginBottom: 10 }}>
        {event.name}
      </div>

      {/* Details */}
      <div style={{ fontSize: 12, color: N.text2, fontWeight: 600, lineHeight: 1.9 }}>
        <div>📅 {event.date}</div>
        <div>📍 {event.venue}</div>
      </div>

      {/* Footer row */}
      <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{
          background: N.bg, borderRadius: 10, boxShadow: N.shadowInSm,
          padding: "5px 12px", fontSize: 11, fontWeight: 800, color: N.text2,
        }}>
          {event.slots} slots
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "3px 3px 8px #d4855855", fontSize: 13,
        }}>→</div>
      </div>
    </div>
  );
}
