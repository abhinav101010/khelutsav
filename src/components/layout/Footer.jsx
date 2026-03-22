import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const FOOTER_COLS = [
  { title: "Navigate", links: [{ label: "Home", path: "/" }, { label: "About", path: "/about" }, { label: "Events", path: "/events" }, { label: "Register", path: "/register" }] },
  { title: "Support",  links: [{ label: "FAQs", path: "/faqs" }, { label: "Contact", path: "/contact" }, { label: "Rules", path: null }, { label: "Schedule", path: null }] },
  { title: "Info",     links: [{ label: "April 10, 2026", path: null }, { label: "North Campus", path: null }, { label: "8 AM – 7 PM", path: null }, { label: "Free Entry", path: null }] },
];

export default function Footer() {
  const { T } = useTheme();
  const navigate = useNavigate();

  return (
    <footer style={{ background: T.footerBg, padding: "3rem 1.5rem 2rem", marginTop: "2rem", transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: "2.5rem" }}>
          <div>
            <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.4rem", color: T.accent, marginBottom: 10 }}>
              SPORTS<span style={{ color: T.text }}>DAY</span><span style={{ color: T.accent2 }}>26</span>
            </div>
            <p style={{ fontSize: 13, color: T.text2, lineHeight: 1.7, fontWeight: 600, maxWidth: 220 }}>
              Annual inter-college sports festival. 12 events, one epic day.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["📘", "📸", "🐦", "▶️"].map((ic, i) => (
                <div key={i} style={{
                  background: T.bg, borderRadius: 10, boxShadow: T.shadowSm,
                  width: 34, height: 34, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "1rem", cursor: "pointer",
                }}>{ic}</div>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.accent, textTransform: "uppercase", marginBottom: 12 }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map(({ label, path }) => (
                  <span key={label}
                    onClick={() => path && navigate(path)}
                    style={{ fontSize: 13, color: T.text2, fontWeight: 600, cursor: path ? "pointer" : "default", transition: "color 0.2s" }}
                    onMouseEnter={e => { if (path) e.target.style.color = T.accent; }}
                    onMouseLeave={e => { if (path) e.target.style.color = T.text2; }}
                  >{label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 12, color: T.text2, fontWeight: 600 }}>© 2026 Sports Day Committee. All rights reserved.</span>
          <span style={{ fontSize: 12, color: T.text2, fontWeight: 600 }}>Made with ❤️ by the Events Team</span>
        </div>
      </div>
    </footer>
  );
}