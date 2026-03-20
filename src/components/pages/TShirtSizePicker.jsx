import N from "../../theme";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function TShirtSizePicker({ size, onChange }) {
  return (
    <div style={{ borderTop: "1px solid #d8dae3", paddingTop: 20, marginBottom: 28 }}>
      <div style={{
        fontSize: 10, fontWeight: 800, letterSpacing: 2,
        color: N.text2, textTransform: "uppercase", marginBottom: 14,
      }}>T-Shirt Size</div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {SIZES.map(s => (
          <div
            key={s}
            onClick={() => onChange(s)}
            style={{
              background: N.bg, borderRadius: 999,
              boxShadow: size === s ? N.shadowIn : N.shadowSm,
              padding: "8px 18px", cursor: "pointer",
              fontWeight: 800, fontSize: 13,
              color: size === s ? N.accent : N.text2,
              border: size === s ? `2px solid ${N.accent}44` : "2px solid transparent",
              transition: "all 0.2s",
            }}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
