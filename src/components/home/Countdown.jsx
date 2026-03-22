import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const TARGET = new Date("2026-04-10T08:00:00");
const calc = () => {
  const d = TARGET - Date.now();
  if (d <= 0) return { days:0, hours:0, mins:0, secs:0 };
  return { days:Math.floor(d/86400000), hours:Math.floor((d%86400000)/3600000), mins:Math.floor((d%3600000)/60000), secs:Math.floor((d%60000)/1000) };
};

export default function Countdown() {
  const { T } = useTheme();
  const [time, setTime] = useState(calc);
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id); }, []);
  const pad = n => String(n).padStart(2, "0");

  return (
    <section style={{ padding:"3rem 1.5rem", textAlign:"center" }}>
      <div style={{ fontSize:11, fontWeight:800, letterSpacing:3, color:T.accent, textTransform:"uppercase", marginBottom:8 }}>⏳ EVENT STARTS IN</div>
      <h2 style={{ fontFamily:"'Black Ops One', cursive", fontSize:"clamp(1.3rem,3vw,1.9rem)", color:T.text, marginBottom:24 }}>
        Countdown to April 10, 2026
      </h2>
      <div className="cd-row" style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
        {[["days",time.days],["hours",time.hours],["mins",time.mins],["secs",time.secs]].map(([label,val]) => (
          <div key={label} className="cd-box" style={{
            background:T.bg, borderRadius:22, boxShadow:T.shadow,
            padding:"20px 26px", minWidth:90, textAlign:"center", position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:"48%",background:T.bg3,borderRadius:"22px 22px 0 0",opacity:0.6 }} />
            <div style={{ position:"absolute",top:"48%",left:0,right:0,height:1,background:T.border }} />
            <div className="cd-num" style={{
              fontFamily:"'Black Ops One', cursive", fontSize:"2.6rem", lineHeight:1,
              background:`linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              position:"relative", zIndex:1,
            }}>{pad(val)}</div>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:1.5, color:T.text2, textTransform:"uppercase", marginTop:8, position:"relative", zIndex:1 }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}