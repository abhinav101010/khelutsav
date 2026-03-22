import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const STATS = [["12","Events"],["600+","Athletes"],["Apr 10","Event Date"],["₹50K","Prize Pool"]];
const FLOATERS = ["🏃","⚽","🏀","🏏","🥊"];

export default function HeroSection() {
  const { T } = useTheme();
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "4rem 1.5rem",
      position: "relative", overflow: "hidden",
    }}>
      {[{ size:340,top:-80,left:-100 },{ size:240,bottom:-60,right:-60 },{ size:160,top:"40%",left:"8%" }].map((c,i) => (
        <div key={i} style={{
          position:"absolute", width:c.size, height:c.size, borderRadius:"50%",
          top:c.top, bottom:c.bottom, left:c.left, right:c.right,
          background:`radial-gradient(circle, ${T.accent}25, transparent 70%)`, pointerEvents:"none",
        }} />
      ))}

      <div className="fade-up" style={{
        background:`linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
        color:"#fff", borderRadius:999, padding:"6px 20px", fontSize:11,
        fontWeight:800, letterSpacing:2.5, textTransform:"uppercase",
        marginBottom:20, boxShadow:"4px 4px 12px #d4855866", display:"inline-block",
      }}>🏆 Annual College Sports Day 2026</div>

      <h1 className="fade-up-1" style={{
        fontFamily:"'Black Ops One', cursive",
        fontSize:"clamp(2.6rem, 9vw, 6.5rem)",
        lineHeight:1.0, color:T.text, marginBottom:16, letterSpacing:"-1px",
      }}>
        UNITE.<br />
        <span style={{ background:`linear-gradient(135deg, ${T.accent}, ${T.accent2})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          COMPETE.
        </span><br />
        CELEBRATE.
      </h1>

      <p className="fade-up-2" style={{ fontSize:"clamp(14px,2.5vw,17px)", color:T.text2, maxWidth:480, lineHeight:1.7, marginBottom:36, fontWeight:600 }}>
        The biggest inter-college sports festival of the year. 12 events, 600+ athletes, one unforgettable day.
      </p>

      <div className="fade-up-3 hero-btns" style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center", marginBottom:48, width:"100%", maxWidth:400 }}>
        <button className="neu-btn" onClick={() => navigate("/register")} style={{
          background:`linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
          color:"#fff", padding:"14px 32px", fontSize:15, borderRadius:16,
          boxShadow:"6px 6px 18px #d4855877", flex:1,
        }}>Register Now 🚀</button>
        <button className="neu-btn"
          onClick={() => document.getElementById("events-section")?.scrollIntoView({ behavior:"smooth" })}
          style={{ padding:"14px 32px", fontSize:15, borderRadius:16, color:T.accent, flex:1 }}>
          View Events →
        </button>
      </div>

      <div className="fade-up-4 stats-row" style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
        {STATS.map(([val,label]) => (
          <div key={label} className="stats-card" style={{
            background:T.bg, borderRadius:20, boxShadow:T.shadow,
            padding:"18px 28px", textAlign:"center", minWidth:110,
          }}>
            <div style={{ fontFamily:"'Righteous', cursive", fontSize:"1.7rem", color:T.accent, lineHeight:1 }}>{val}</div>
            <div style={{ fontSize:12, fontWeight:700, color:T.text2, marginTop:4, letterSpacing:1 }}>{label}</div>
          </div>
        ))}
      </div>

      {FLOATERS.map((e,i) => (
        <div key={i} className="float" style={{
          position:"absolute", fontSize:"2.2rem", opacity:0.1,
          animationDelay:`${i*0.6}s`, top:`${15+i*15}%`,
          left:i%2===0?`${3+i*2}%`:undefined, right:i%2!==0?`${3+i*2}%`:undefined,
          pointerEvents:"none",
        }}>{e}</div>
      ))}
    </section>
  );
}