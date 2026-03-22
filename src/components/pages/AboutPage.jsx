import { useTheme } from "../../context/ThemeContext";
import { ABOUT_CARDS } from "../../data/sportsData";

export default function AboutPage() {
  const { T } = useTheme();
  return (
    <div style={{ maxWidth:860, margin:"0 auto", padding:"4rem 1.5rem" }}>
      <div style={{ textAlign:"center", marginBottom:"3rem" }}>
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:3, color:T.accent, textTransform:"uppercase", marginBottom:8 }}>WHO WE ARE</div>
        <h2 style={{ fontFamily:"'Black Ops One', cursive", fontSize:"clamp(2rem,5vw,2.8rem)", color:T.text }}>About Sports Day</h2>
      </div>
      <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:32 }}>
        {ABOUT_CARDS.map((c, i) => (
          <div key={i} style={{ background:T.bg, borderRadius:22, boxShadow:T.shadow, padding:"1.8rem" }}>
            <div style={{ fontSize:"2rem", marginBottom:10 }}>{c.icon}</div>
            <div style={{ fontFamily:"'Righteous', cursive", fontSize:"1.1rem", color:T.text, marginBottom:8 }}>{c.title}</div>
            <p style={{ fontSize:14, color:T.text2, lineHeight:1.7, fontWeight:600 }}>{c.text}</p>
          </div>
        ))}
      </div>
      <div style={{ background:T.bg, borderRadius:24, boxShadow:T.shadow, padding:"2rem", textAlign:"center" }}>
        <div style={{ fontFamily:"'Black Ops One', cursive", fontSize:"1.5rem", color:T.text, marginBottom:10 }}>
          Event Day: <span style={{ color:T.accent }}>April 10, 2026</span>
        </div>
        <p style={{ color:T.text2, fontWeight:600 }}>Gates open at 8:00 AM · Main Ground, North Campus · Entry Free for all registered participants</p>
      </div>
    </div>
  );
}