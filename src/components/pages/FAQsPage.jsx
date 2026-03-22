import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FAQS } from "../../data/sportsData";

export default function FAQsPage() {
  const { T } = useTheme();
  const [open, setOpen] = useState(null);

  return (
    <div style={{ maxWidth:720, margin:"0 auto", padding:"4rem 1.5rem" }}>
      <div style={{ textAlign:"center", marginBottom:"3rem" }}>
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:3, color:T.accent, textTransform:"uppercase", marginBottom:8 }}>GOT QUESTIONS?</div>
        <h2 style={{ fontFamily:"'Black Ops One', cursive", fontSize:"clamp(2rem,5vw,2.8rem)", color:T.text }}>FAQs</h2>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {FAQS.map(([q, a], i) => (
          <div key={i} onClick={() => setOpen(open===i?null:i)} style={{
            background:T.bg, borderRadius:18,
            boxShadow:open===i?T.shadowIn:T.shadow,
            padding:"1.2rem 1.5rem", cursor:"pointer", transition:"all 0.25s",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <span style={{ fontWeight:800, fontSize:15, color:open===i?T.accent:T.text }}>{q}</span>
              <span style={{ fontSize:18, color:T.accent, fontWeight:900, flexShrink:0, transition:"transform 0.2s", transform:open===i?"rotate(45deg)":"none" }}>+</span>
            </div>
            {open===i && <p style={{ marginTop:12, fontSize:14, color:T.text2, lineHeight:1.7, fontWeight:600, borderTop:`1px solid ${T.border}`, paddingTop:12 }}>{a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}