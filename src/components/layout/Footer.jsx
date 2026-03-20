import N from "../../theme";

const FOOTER_COLS = [
  { title: "Navigate", links: ["Home", "About", "Events", "Register"] },
  { title: "Support",  links: ["FAQs", "Contact", "Rules", "Schedule"] },
  { title: "Info",     links: ["April 18, 2026", "North Campus", "8 AM – 7 PM", "Free Entry"] },
];

const NAVIGABLE = ["Home", "About", "Events", "Register", "FAQs", "Contact"];

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: N.bg2, padding: "3rem 2.5rem 2rem", marginTop: "2rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 32,
          marginBottom: "2.5rem",
        }}>

          {/* Brand column */}
          <div>
            <div style={{
              fontFamily: "'Black Ops One', cursive",
              fontSize: "1.4rem", color: N.accent, marginBottom: 10,
            }}>
              SPORTS<span style={{ color: N.text }}>DAY</span>
              <span style={{ color: N.accent2 }}>26</span>
            </div>
            <p style={{ fontSize: 13, color: N.text2, lineHeight: 1.7, fontWeight: 600, maxWidth: 220 }}>
              Annual inter-college sports festival. 12 events, one epic day.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["📘", "📸", "🐦", "▶️"].map((ic, i) => (
                <div key={i} style={{
                  background: N.bg, borderRadius: 10,
                  boxShadow: N.shadowSm,
                  width: 34, height: 34,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", cursor: "pointer",
                }}>{ic}</div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <div style={{
                fontSize: 10, fontWeight: 800, letterSpacing: 2,
                color: N.accent, textTransform: "uppercase", marginBottom: 12,
              }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map(l => (
                  <span
                    key={l}
                    onClick={() => NAVIGABLE.includes(l) && setPage(l.toLowerCase())}
                    style={{ fontSize: 13, color: N.text2, fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = N.accent}
                    onMouseLeave={e => e.target.style.color = N.text2}
                  >{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid #c5c7cf", paddingTop: 16,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 12, color: N.text2, fontWeight: 600 }}>
            © 2026 Sports Day Committee. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: N.text2, fontWeight: 600 }}>
            Made with ❤️ by the Events Team
          </span>
        </div>

      </div>
    </footer>
  );
}
