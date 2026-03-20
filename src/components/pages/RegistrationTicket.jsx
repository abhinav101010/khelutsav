import N from "../../theme";

export default function RegistrationTicket({ name, roll, selected, size, regId, onBack }) {
  const rows = [
    ["Athlete", name],
    ["Roll No.", roll],
    ["Events",  [...selected].join(", ")],
    ["T-Shirt", size],
  ];

  return (
    <div style={{
      maxWidth: 520, margin: "4rem auto", padding: "0 1.5rem",
    }}>
      <div style={{
        background: N.bg, borderRadius: 28, boxShadow: N.shadow,
        padding: "3rem 2rem", textAlign: "center",
      }}>
        <div style={{ fontSize: "4rem", marginBottom: 12, animation: "pulse 1s 2" }}>🎉</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2rem", color: N.text, marginBottom: 8 }}>
          You're In!
        </h2>
        <p style={{ color: N.text2, fontWeight: 600, marginBottom: 28 }}>
          Registration confirmed! See you on April 18 🏆
        </p>

        {/* Ticket body */}
        <div style={{ background: N.bg, borderRadius: 20, boxShadow: N.shadowIn, padding: "1.8rem", textAlign: "left" }}>
          {rows.map(([label, value]) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "8px 0", borderBottom: "1px solid #d8dae3",
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: N.text2, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {label}
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: N.text }}>{value}</span>
            </div>
          ))}

          {/* Registration ID */}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: N.text2, textTransform: "uppercase", marginBottom: 4 }}>
              Registration ID
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "1.6rem", fontWeight: 900, color: N.accent, letterSpacing: 4 }}>
              {regId}
            </div>
          </div>
        </div>

        <button className="neu-btn" onClick={onBack} style={{
          marginTop: 24, padding: "11px 28px", fontSize: 14, color: N.accent, borderRadius: 12,
        }}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
