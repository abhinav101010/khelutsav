import N from "../../theme";
import { SPONSORS } from "../../data/sportsData";

// Double the list so the CSS loop is seamless
const DOUBLED = [...SPONSORS, ...SPONSORS];

export default function SponsorsSection() {
  return (
    <section style={{ padding: "4rem 0", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem", padding: "0 2rem" }}>
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 3,
          color: N.accent, textTransform: "uppercase", marginBottom: 6,
        }}>POWERED BY</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2rem", color: N.text }}>
          Our Sponsors
        </h2>
      </div>

      {/* Sliding track */}
      <div style={{ position: "relative" }}>
        {/* Fade edges */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
          background: `linear-gradient(to right, ${N.bg}, transparent)`,
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
          background: `linear-gradient(to left, ${N.bg}, transparent)`,
          zIndex: 2, pointerEvents: "none",
        }} />

        <div style={{ overflow: "hidden", padding: "1rem 0" }}>
          <div className="sponsor-track">
            {DOUBLED.map((s, i) => (
              <div key={i} style={{
                background: N.bg, borderRadius: 20, boxShadow: N.shadow,
                padding: "1.2rem 2rem",
                display: "flex", alignItems: "center", gap: 12,
                minWidth: 160, flexShrink: 0, whiteSpace: "nowrap",
              }}>
                <span style={{ fontSize: "1.8rem" }}>{s.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1rem", color: s.color }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: 10, color: N.text2, fontWeight: 700, letterSpacing: 1 }}>
                    SPONSOR
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
