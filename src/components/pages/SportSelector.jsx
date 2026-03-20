import N from "../../theme";
import { EVENTS } from "../../data/sportsData";

export default function SportSelector({ selected, onToggle }) {
  return (
    <div style={{ borderTop: "1px solid #d8dae3", paddingTop: 20, marginBottom: 24 }}>

      {/* Label + counter */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: N.text2, textTransform: "uppercase" }}>
          Choose Events
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: N.accent }}>
          {selected.size}/3 selected
        </div>
      </div>

      {/* Grid of sport buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {EVENTS.map((ev) => {
          const active = selected.has(ev.name);
          return (
            <div
              key={ev.name}
              onClick={() => onToggle(ev.name)}
              style={{
                background: N.bg, borderRadius: 16,
                boxShadow: active ? N.shadowIn : N.shadowSm,
                padding: "12px 8px", textAlign: "center", cursor: "pointer",
                border: active ? `2px solid ${N.accent}44` : "2px solid transparent",
                transition: "all 0.2s",
              }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>{ev.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: active ? N.accent : N.text2 }}>
                {ev.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
