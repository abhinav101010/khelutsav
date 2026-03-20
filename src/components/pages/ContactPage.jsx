import { useState } from "react";
import N from "../../theme";

const CONTACT_INFO = [
  ["📧", "Email",  "sports@college.edu"],
  ["📞", "Phone",  "+91 98765 43210"],
  ["📍", "Office", "Room 204, Block A"],
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 2rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 3,
          color: N.accent, textTransform: "uppercase", marginBottom: 8,
        }}>GET IN TOUCH</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.8rem", color: N.text }}>
          Contact Us
        </h2>
        <p style={{ color: N.text2, marginTop: 10, fontWeight: 600 }}>
          Have questions or concerns? Reach out to the Sports Committee.
        </p>
      </div>

      {/* Info cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 32 }}>
        {CONTACT_INFO.map(([ic, label, val]) => (
          <div key={label} style={{
            background: N.bg, borderRadius: 18, boxShadow: N.shadow,
            padding: "1.2rem", textAlign: "center",
          }}>
            <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{ic}</div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: N.accent, textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontSize: 12, color: N.text2, fontWeight: 600, marginTop: 3 }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Form or success state */}
      {!sent ? (
        <div style={{ background: N.bg, borderRadius: 24, boxShadow: N.shadow, padding: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input className="neu-input" placeholder="Your name" />
            <input className="neu-input" placeholder="Email address" type="email" />
            <textarea className="neu-input" placeholder="Your message..." rows={4} style={{ resize: "vertical" }} />
            <button className="neu-btn" onClick={() => setSent(true)} style={{
              background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
              color: "#fff", padding: "13px", fontSize: 15,
              boxShadow: "5px 5px 14px #d4855866, -2px -2px 8px #fff",
            }}>Send Message 📨</button>
          </div>
        </div>
      ) : (
        <div style={{
          background: N.bg, borderRadius: 24, boxShadow: N.shadow,
          padding: "3rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
          <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.4rem", color: N.text, marginBottom: 8 }}>
            Message Sent!
          </div>
          <p style={{ color: N.text2, fontWeight: 600 }}>We'll get back to you within 24 hours.</p>
        </div>
      )}
    </div>
  );
}
