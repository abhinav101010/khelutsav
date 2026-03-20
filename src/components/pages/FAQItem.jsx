import { useState } from "react";
import N from "../../theme";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        background: N.bg, borderRadius: 18,
        boxShadow: open
          ? "inset 5px 5px 14px #c5c7cf, inset -5px -5px 14px #ffffff"
          : N.shadow,
        padding: "1.2rem 1.5rem",
        cursor: "pointer", transition: "all 0.25s",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 800, fontSize: 15, color: open ? N.accent : N.text }}>
          {question}
        </span>
        <span style={{
          fontSize: 18, color: N.accent, fontWeight: 900,
          transition: "transform 0.2s",
          transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </div>

      {open && (
        <p style={{
          marginTop: 12, fontSize: 14, color: N.text2, lineHeight: 1.7,
          fontWeight: 600, borderTop: "1px solid #d8dae3", paddingTop: 12,
        }}>{answer}</p>
      )}
    </div>
  );
}
