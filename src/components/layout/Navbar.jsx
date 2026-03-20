import N from "../../theme";

const NAV_LINKS = ["Home", "About", "Events", "FAQs", "Contact"];

export default function Navbar({ page, setPage }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: N.bg,
      boxShadow: "0 6px 24px #c5c7cf66, 0 -1px 0 #fff",
      padding: "0 2.5rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    }}>
      {/* Logo */}
      <div
        onClick={() => setPage("home")}
        style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: "1.25rem",
          color: N.accent,
          cursor: "pointer",
          letterSpacing: 1,
        }}>
        SPORTS
        <span style={{ color: N.text }}>DAY</span>
        <span style={{ color: N.accent2 }}>26</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {NAV_LINKS.map(l => (
          <button
            key={l}
            onClick={() => setPage(l.toLowerCase())}
            style={{
              background: "none", border: "none",
              fontFamily: "'Nunito', sans-serif",
              fontSize: 13, fontWeight: 700,
              color: page === l.toLowerCase() ? N.accent : N.text2,
              padding: "7px 14px", borderRadius: 999,
              cursor: "pointer",
              boxShadow: page === l.toLowerCase() ? N.shadowInSm : "none",
              transition: "all 0.2s",
            }}>
            {l}
          </button>
        ))}

        {/* CTA */}
        <button
          onClick={() => setPage("register")}
          style={{
            fontFamily: "'Righteous', cursive", fontSize: 13,
            background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
            color: "#fff", border: "none", borderRadius: 999,
            padding: "9px 22px", cursor: "pointer",
            boxShadow: "4px 4px 14px #d4855866, -2px -2px 8px #fff",
            transition: "all 0.2s", marginLeft: 8,
          }}>
          Register Now →
        </button>
      </div>
    </nav>
  );
}
