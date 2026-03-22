import { useTheme } from "../../context/ThemeContext";
import useFetch from "../../hooks/useFetch";
import API_BASE from "../../config";

export default function SponsorsSection() {
  const { T } = useTheme();
  const { data: sponsors, loading } = useFetch(`${API_BASE}/api/sponsors`);

  const list = sponsors || [];
  const doubled = [...list, ...list];

  return (
    <section style={{ padding: "4rem 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem", padding: "0 1.5rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 6 }}>POWERED BY</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(1.6rem,4vw,2rem)", color: T.text }}>Our Sponsors</h2>
      </div>

      {loading ? (
        <div style={{ display: "flex", gap: "2rem", padding: "1rem 1.5rem", overflow: "hidden" }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={{
              background: T.bg, borderRadius: 20, boxShadow: T.shadow,
              padding: "1.2rem 2rem", minWidth: 160, flexShrink: 0,
              animation: "pulse 1.4s ease-in-out infinite",
            }}>
              <div style={{ height: 28, width: "70%", background: T.bg2, borderRadius: 8 }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${T.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${T.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
          <div style={{ overflow: "hidden", padding: "1rem 0" }}>
            <div className="sponsor-track">
              {doubled.map((s, i) => (
                <div key={i} style={{
                  background: T.bg, borderRadius: 20, boxShadow: T.shadow,
                  padding: "1.2rem 2rem", display: "flex", alignItems: "center", gap: 12,
                  minWidth: 160, flexShrink: 0, whiteSpace: "nowrap",
                }}>
                  <span style={{ fontSize: "1.8rem" }}>{s.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1rem", color: s.color }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: T.text2, fontWeight: 700, letterSpacing: 1 }}>
                      {s.tier?.toUpperCase()} SPONSOR
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}