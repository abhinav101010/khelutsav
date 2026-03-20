import { useState, useEffect } from "react";

/* ─── THEMES ─── */
const light = {
  bg: "#e8eaf0", bg2: "#dfe1e8", bg3: "#f0f1f6",
  text: "#2c2e3e", text2: "#7a7e99",
  accent: "#ff6b3d", accent2: "#ffb347",
  border: "#d0d2db",
  shadow: "8px 8px 22px #c5c7cf, -8px -8px 22px #ffffff",
  shadowSm: "4px 4px 12px #c5c7cf, -4px -4px 12px #ffffff",
  shadowIn: "inset 5px 5px 14px #c5c7cf, inset -5px -5px 14px #ffffff",
  shadowInSm: "inset 3px 3px 8px #c5c7cf, inset -3px -3px 8px #ffffff",
  footerBg: "#dfe1e8",
  navShadow: "0 6px 24px #c5c7cf66, 0 -1px 0 #fff",
  teamBg: "#e0f0ff", teamColor: "#1a6fa8",
  soloBg: "#fff0ea",
};
const dark = {
  bg: "#1e2030", bg2: "#171925", bg3: "#252840",
  text: "#e8eaf5", text2: "#8b8faa",
  accent: "#ff6b3d", accent2: "#ffb347",
  border: "#2e3150",
  shadow: "8px 8px 22px #13151f, -8px -8px 22px #272d4a",
  shadowSm: "4px 4px 12px #13151f, -4px -4px 12px #272d4a",
  shadowIn: "inset 5px 5px 14px #13151f, inset -5px -5px 14px #272d4a",
  shadowInSm: "inset 3px 3px 8px #13151f, inset -3px -3px 8px #272d4a",
  footerBg: "#171925",
  navShadow: "0 6px 24px #0d0f1880",
  teamBg: "#0f1e2e", teamColor: "#4da6e8",
  soloBg: "#2a1a10",
};

const makeGlobalStyle = (isDark) => {
  const T = isDark ? dark : light;
  return `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Black+Ops+One&family=Righteous&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.bg}; font-family: 'Nunito', sans-serif; color: ${T.text}; overflow-x: hidden; transition: background 0.3s, color 0.3s; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${T.bg2}; }
  ::-webkit-scrollbar-thumb { background: ${isDark ? "#3d4260" : "#b0b3c8"}; border-radius: 3px; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes floatY { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
  @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes shakeX { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }

  .fade-up   { animation: fadeUp 0.6s ease both; }
  .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
  .fade-up-4 { animation: fadeUp 0.6s 0.4s ease both; }
  .float     { animation: floatY 3s ease-in-out infinite; }
  .sponsor-track { display:flex; gap:2rem; animation: scroll-left 18s linear infinite; width: max-content; }
  .sponsor-track:hover { animation-play-state: paused; }

  .neu-btn {
    background: ${T.bg}; border: none; border-radius: 14px;
    box-shadow: ${T.shadow}; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-weight: 800; color: ${T.text}; transition: all 0.18s;
  }
  .neu-btn:hover  { box-shadow: ${T.shadowSm}; transform: translateY(-1px); }
  .neu-btn:active { box-shadow: ${T.shadowIn}; transform: translateY(0); }

  .neu-input {
    width: 100%; background: ${T.bg}; border: none; outline: none;
    border-radius: 14px; box-shadow: ${T.shadowIn};
    padding: 13px 18px; font-size: 14px; font-family: 'Nunito', sans-serif;
    font-weight: 700; color: ${T.text}; transition: box-shadow 0.2s;
  }
  .neu-input::placeholder { color: ${T.text2}; font-weight: 400; }
  .neu-input:focus { box-shadow: ${T.shadowIn}, 0 0 0 2.5px #ff6b3d44; }

  .neu-select {
    width: 100%; background: ${T.bg}; border: none; outline: none;
    border-radius: 14px; box-shadow: ${T.shadowIn};
    padding: 13px 18px; font-size: 14px; font-family: 'Nunito', sans-serif;
    font-weight: 700; color: ${T.text}; appearance: none; cursor: pointer;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .desktop-nav  { display: none !important; }
    .hamburger    { display: flex !important; }
    .hero-btns    { flex-direction: column; align-items: stretch; }
    .hero-btns button { width: 100%; }
    .stats-row    { gap: 10px !important; }
    .stats-card   { min-width: 72px !important; padding: 12px 14px !important; }
    .events-grid  { grid-template-columns: 1fr 1fr !important; }
    .about-grid   { grid-template-columns: 1fr !important; }
    .footer-grid  { grid-template-columns: 1fr 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .reg-2col     { grid-template-columns: 1fr !important; }
    .cd-row       { gap: 10px !important; }
    .cd-box       { min-width: 66px !important; padding: 14px 10px !important; }
    .cd-num       { font-size: 2rem !important; }
  }
  @media (max-width: 480px) {
    .events-grid  { grid-template-columns: 1fr !important; }
    .sports-grid  { grid-template-columns: repeat(2, 1fr) !important; }
    .footer-grid  { grid-template-columns: 1fr !important; }
  }
`;
};

/* ─── COUNTDOWN ─── */
function Countdown({ T }) {
  const target = new Date("2026-04-10T08:00:00");
  const calc = () => {
    const d = target - Date.now();
    if (d <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      mins:  Math.floor((d % 3600000) / 60000),
      secs:  Math.floor((d % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, "0");

  return (
    <section style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 8 }}>
        ⏳ EVENT STARTS IN
      </div>
      <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(1.3rem,3vw,1.9rem)", color: T.text, marginBottom: 24 }}>
        Countdown to April 10, 2026
      </h2>
      <div className="cd-row" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        {[["days", time.days], ["hours", time.hours], ["mins", time.mins], ["secs", time.secs]].map(([label, val]) => (
          <div key={label} className="cd-box" style={{
            background: T.bg, borderRadius: 22, boxShadow: T.shadow,
            padding: "20px 26px", minWidth: 90, textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "48%",
              background: T.bg3, borderRadius: "22px 22px 0 0", opacity: 0.6,
            }} />
            <div style={{ position: "absolute", top: "48%", left: 0, right: 0, height: 1, background: T.border }} />
            <div className="cd-num" style={{
              fontFamily: "'Black Ops One', cursive", fontSize: "2.6rem", lineHeight: 1,
              background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              position: "relative", zIndex: 1,
            }}>{pad(val)}</div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: T.text2, textTransform: "uppercase", marginTop: 8, position: "relative", zIndex: 1 }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── NAVBAR ─── */
function Navbar({ page, setPage, isDark, setIsDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const T = isDark ? dark : light;
  const links = ["Home", "About", "Events", "FAQs", "Contact"];

  const go = (p) => { setPage(p); setMenuOpen(false); };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: T.bg, boxShadow: T.navShadow,
      padding: "0 1.5rem", display: "flex",
      alignItems: "center", justifyContent: "space-between",
      height: 64, transition: "background 0.3s",
    }}>
      <div onClick={() => go("home")} style={{
        fontFamily: "'Black Ops One', cursive", fontSize: "1.2rem",
        color: T.accent, cursor: "pointer", letterSpacing: 1,
      }}>
        SPORTS<span style={{ color: T.text }}>DAY</span><span style={{ color: T.accent2 }}>26</span>
      </div>

      {/* Desktop */}
      <div className="desktop-nav" style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {links.map(l => (
          <button key={l} onClick={() => go(l.toLowerCase())} style={{
            background: "none", border: "none",
            fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700,
            color: page === l.toLowerCase() ? T.accent : T.text2,
            padding: "7px 12px", borderRadius: 999, cursor: "pointer",
            boxShadow: page === l.toLowerCase() ? T.shadowInSm : "none",
            transition: "all 0.2s",
          }}>{l}</button>
        ))}
        <button onClick={() => go("register")} style={{
          fontFamily: "'Righteous', cursive", fontSize: 13,
          background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
          color: "#fff", border: "none", borderRadius: 999,
          padding: "8px 18px", cursor: "pointer",
          boxShadow: "4px 4px 14px #d4855866", marginLeft: 6,
        }}>Register →</button>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Dark toggle */}
        <button onClick={() => setIsDark(d => !d)} style={{
          background: T.bg, border: "none", borderRadius: 999,
          boxShadow: T.shadowSm, width: 38, height: 38,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "1.1rem",
        }}>{isDark ? "☀️" : "🌙"}</button>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: "none", background: T.bg, border: "none",
            borderRadius: 10, boxShadow: T.shadowSm,
            width: 38, height: 38, flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 5, cursor: "pointer",
          }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 18, height: 2, background: T.text, borderRadius: 2,
              transition: "all 0.25s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "scaleX(0)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: T.bg, boxShadow: T.shadow,
          padding: "1rem 1.5rem", zIndex: 300,
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())} style={{
              background: page === l.toLowerCase() ? T.bg2 : "none",
              border: "none", textAlign: "left",
              fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700,
              color: page === l.toLowerCase() ? T.accent : T.text,
              padding: "10px 14px", borderRadius: 12, cursor: "pointer",
              boxShadow: page === l.toLowerCase() ? T.shadowInSm : "none",
            }}>{l}</button>
          ))}
          <button onClick={() => go("register")} style={{
            fontFamily: "'Righteous', cursive", fontSize: 14,
            background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
            color: "#fff", border: "none", borderRadius: 12,
            padding: "11px 18px", cursor: "pointer", marginTop: 4,
          }}>Register Now →</button>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function HeroSection({ setPage, T }) {
  return (
    <section style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "4rem 1.5rem",
      position: "relative", overflow: "hidden",
    }}>
      {[{ size: 340, top: -80, left: -100 }, { size: 240, bottom: -60, right: -60 }, { size: 160, top: "40%", left: "8%" }].map((c, i) => (
        <div key={i} style={{
          position: "absolute", width: c.size, height: c.size, borderRadius: "50%",
          top: c.top, bottom: c.bottom, left: c.left, right: c.right,
          background: `radial-gradient(circle, ${T.accent}25, transparent 70%)`,
          pointerEvents: "none",
        }} />
      ))}

      <div className="fade-up" style={{
        background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
        color: "#fff", borderRadius: 999, padding: "6px 20px", fontSize: 11,
        fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase",
        marginBottom: 20, boxShadow: "4px 4px 12px #d4855866", display: "inline-block",
      }}>🏆 Annual College Sports Day 2026</div>

      <h1 className="fade-up-1" style={{
        fontFamily: "'Black Ops One', cursive",
        fontSize: "clamp(2.6rem, 9vw, 6.5rem)",
        lineHeight: 1.0, color: T.text, marginBottom: 16, letterSpacing: "-1px",
      }}>
        UNITE.<br />
        <span style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          COMPETE.
        </span><br />
        CELEBRATE.
      </h1>

      <p className="fade-up-2" style={{
        fontSize: "clamp(14px, 2.5vw, 17px)", color: T.text2,
        maxWidth: 480, lineHeight: 1.7, marginBottom: 36, fontWeight: 600,
      }}>
        The biggest inter-college sports festival of the year. 12 events, 600+ athletes, one unforgettable day.
      </p>

      <div className="fade-up-3 hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 48, width: "100%", maxWidth: 400 }}>
        <button className="neu-btn" onClick={() => setPage("register")} style={{
          background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
          color: "#fff", padding: "14px 32px", fontSize: 15, borderRadius: 16,
          boxShadow: "6px 6px 18px #d4855877", flex: 1,
        }}>Register Now 🚀</button>
        <button className="neu-btn"
          onClick={() => document.getElementById("events-section")?.scrollIntoView({ behavior: "smooth" })}
          style={{ padding: "14px 32px", fontSize: 15, borderRadius: 16, color: T.accent, flex: 1 }}>
          View Events →
        </button>
      </div>

      <div className="fade-up-4 stats-row" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {[["12", "Events"], ["600+", "Athletes"], ["Apr 10", "Event Date"], ["₹50K", "Prize Pool"]].map(([val, label]) => (
          <div key={label} className="stats-card" style={{
            background: T.bg, borderRadius: 20, boxShadow: T.shadow,
            padding: "18px 28px", textAlign: "center", minWidth: 110,
          }}>
            <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.7rem", color: T.accent, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text2, marginTop: 4, letterSpacing: 1 }}>{label}</div>
          </div>
        ))}
      </div>

      {["🏃", "⚽", "🏀", "🏏", "🥊"].map((e, i) => (
        <div key={i} className="float" style={{
          position: "absolute", fontSize: "2.2rem", opacity: 0.1,
          animationDelay: `${i * 0.6}s`,
          top: `${15 + i * 15}%`,
          left: i % 2 === 0 ? `${3 + i * 2}%` : undefined,
          right: i % 2 !== 0 ? `${3 + i * 2}%` : undefined,
          pointerEvents: "none",
        }}>{e}</div>
      ))}
    </section>
  );
}

/* ─── EVENTS ─── */
const EVENTS = [
  { icon: "🏃", name: "100m Sprint",   date: "Apr 10, 9:00 AM",  venue: "Main Track",   slots: 32, tag: "Individual" },
  { icon: "⚽", name: "Football",      date: "Apr 10, 10:30 AM", venue: "Ground A",     slots: 8,  tag: "Team" },
  { icon: "🏀", name: "Basketball",    date: "Apr 10, 12:00 PM", venue: "Court 1",      slots: 8,  tag: "Team" },
  { icon: "🏏", name: "Cricket",       date: "Apr 10, 9:30 AM",  venue: "Ground B",     slots: 4,  tag: "Team" },
  { icon: "🏐", name: "Volleyball",    date: "Apr 10, 2:00 PM",  venue: "Court 2",      slots: 8,  tag: "Team" },
  { icon: "🥊", name: "Arm Wrestling", date: "Apr 10, 3:00 PM",  venue: "Hall C",       slots: 16, tag: "Individual" },
  { icon: "🦅", name: "Long Jump",     date: "Apr 10, 11:00 AM", venue: "Pit Area",     slots: 20, tag: "Individual" },
  { icon: "💪", name: "Tug of War",    date: "Apr 10, 4:00 PM",  venue: "Main Ground",  slots: 6,  tag: "Team" },
  { icon: "🎾", name: "Table Tennis",  date: "Apr 10, 10:00 AM", venue: "Hall A",       slots: 24, tag: "Individual" },
  { icon: "🏊", name: "Swimming",      date: "Apr 10, 8:00 AM",  venue: "Pool",         slots: 16, tag: "Individual" },
  { icon: "🤼", name: "Kabaddi",       date: "Apr 10, 1:00 PM",  venue: "Ground C",     slots: 6,  tag: "Team" },
  { icon: "🎯", name: "Javelin Throw", date: "Apr 10, 3:30 PM",  venue: "Field Zone",   slots: 20, tag: "Individual" },
];

function EventsSection({ T }) {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="events-section" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 8 }}>WHAT'S ON</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(2rem,5vw,2.8rem)", color: T.text, lineHeight: 1.1 }}>Games & Events</h2>
        <p style={{ color: T.text2, marginTop: 10, fontWeight: 600 }}>Pick your battle. Register before slots fill up!</p>
      </div>
      <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {EVENTS.map((ev, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{
              background: T.bg, borderRadius: 22, boxShadow: T.shadow,
              padding: "1.5rem",
              transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
              transition: "all 0.25s", position: "relative", overflow: "hidden",
            }}>
            <div style={{ position: "absolute", top: -10, right: -10, width: 80, height: 80, background: `radial-gradient(circle, ${T.accent}18, transparent)`, borderRadius: "50%" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: "2.2rem" }}>{ev.icon}</span>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: 1, padding: "4px 10px", borderRadius: 999,
                background: ev.tag === "Team" ? T.teamBg : T.soloBg,
                color: ev.tag === "Team" ? T.teamColor : T.accent,
                boxShadow: T.shadowInSm,
              }}>{ev.tag}</span>
            </div>
            <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.15rem", color: T.text, marginBottom: 10 }}>{ev.name}</div>
            <div style={{ fontSize: 12, color: T.text2, fontWeight: 600, lineHeight: 1.9 }}>
              <div>📅 {ev.date}</div>
              <div>📍 {ev.venue}</div>
            </div>
            <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ background: T.bg, borderRadius: 10, boxShadow: T.shadowInSm, padding: "5px 12px", fontSize: 11, fontWeight: 800, color: T.text2 }}>{ev.slots} slots</div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>→</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── SPONSORS ─── */
function SponsorsSection({ T }) {
  const sponsors = [
    { name: "RedBull", color: "#e53935", emoji: "🔴" }, { name: "Nike", color: T.text, emoji: "✔️" },
    { name: "Adidas", color: "#1976d2", emoji: "〽️" }, { name: "Puma", color: "#e53935", emoji: "🐆" },
    { name: "Decathlon", color: "#0288d1", emoji: "🏬" }, { name: "BoostUp", color: "#f57c00", emoji: "⚡" },
    { name: "FitLife", color: "#388e3c", emoji: "🌿" }, { name: "SportZone", color: "#7b1fa2", emoji: "🎯" },
  ];
  const doubled = [...sponsors, ...sponsors];
  return (
    <section style={{ padding: "4rem 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem", padding: "0 1.5rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 6 }}>POWERED BY</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(1.6rem,4vw,2rem)", color: T.text }}>Our Sponsors</h2>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${T.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${T.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ overflow: "hidden", padding: "1rem 0" }}>
          <div className="sponsor-track">
            {doubled.map((s, i) => (
              <div key={i} style={{
                background: T.bg, borderRadius: 20, boxShadow: T.shadow,
                padding: "1.2rem 2rem", display: "flex", alignItems: "center", gap: 12,
                minWidth: 160, flexShrink: 0, whiteSpace: "nowrap",
              }}>
                <span style={{ fontSize: "1.8rem" }}>{s.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1rem", color: s.color }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: T.text2, fontWeight: 700, letterSpacing: 1 }}>SPONSOR</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function AboutPage({ T }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 8 }}>WHO WE ARE</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(2rem,5vw,2.8rem)", color: T.text }}>About Sports Day</h2>
      </div>
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {[
          { icon: "🏆", title: "Our Legacy", text: "Running for 12 years, Sports Day has grown to become the most-awaited annual event at our college, uniting students from all departments." },
          { icon: "🎯", title: "Our Mission", text: "To foster sportsmanship, team spirit, and physical wellness among college students through healthy competition and community bonding." },
          { icon: "🌟", title: "What to Expect", text: "12 competitive events, live DJ, food stalls, prize distribution, and energy that'll make you come back every year." },
          { icon: "🤝", title: "Inclusivity", text: "From first years to final years — everyone competes. Solo athletes, team players, cheerleaders, and volunteers all welcome." },
        ].map((c, i) => (
          <div key={i} style={{ background: T.bg, borderRadius: 22, boxShadow: T.shadow, padding: "1.8rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.1rem", color: T.text, marginBottom: 8 }}>{c.title}</div>
            <p style={{ fontSize: 14, color: T.text2, lineHeight: 1.7, fontWeight: 600 }}>{c.text}</p>
          </div>
        ))}
      </div>
      <div style={{ background: T.bg, borderRadius: 24, boxShadow: T.shadow, padding: "2rem", textAlign: "center" }}>
        <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.5rem", color: T.text, marginBottom: 10 }}>
          Event Day: <span style={{ color: T.accent }}>April 10, 2026</span>
        </div>
        <p style={{ color: T.text2, fontWeight: 600 }}>Gates open at 8:00 AM · Main Ground, North Campus · Entry Free for all registered participants</p>
      </div>
    </div>
  );
}

/* ─── FAQs ─── */
function FAQsPage({ T }) {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["Who can participate?", "All currently enrolled college students with a valid ID. Students from all years and departments are welcome."],
    ["How many events can I register for?", "Up to 3 events. Teams must have a minimum of 5 members for team sports."],
    ["Is there a registration fee?", "Nope! Completely free for all students. Just bring your college ID on event day."],
    ["What do I win?", "Trophies, medals, and cash prizes. The overall champion team wins the rolling trophy + ₹50,000 prize pool."],
    ["Can I register on the day?", "On-spot registration is available until 8:30 AM but slots are limited — register online to be safe."],
    ["What should I wear?", "Comfortable sportswear and footwear. Each registered participant gets a free Sports Day 2026 T-shirt."],
    ["Is there food available?", "Yes! Multiple food stalls and a hydration station will be set up throughout the day."],
    ["How do I know if I'm confirmed?", "After registering, you'll receive a unique registration ID. Keep it saved — you'll need it at check-in."],
  ];
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 8 }}>GOT QUESTIONS?</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(2rem,5vw,2.8rem)", color: T.text }}>FAQs</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {faqs.map(([q, a], i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{
            background: T.bg, borderRadius: 18,
            boxShadow: open === i ? T.shadowIn : T.shadow,
            padding: "1.2rem 1.5rem", cursor: "pointer", transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span style={{ fontWeight: 800, fontSize: 15, color: open === i ? T.accent : T.text }}>{q}</span>
              <span style={{ fontSize: 18, color: T.accent, fontWeight: 900, flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </div>
            {open === i && <p style={{ marginTop: 12, fontSize: 14, color: T.text2, lineHeight: 1.7, fontWeight: 600, borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>{a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTACT ─── */
function ContactPage({ T }) {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 8 }}>GET IN TOUCH</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(2rem,5vw,2.8rem)", color: T.text }}>Contact Us</h2>
        <p style={{ color: T.text2, marginTop: 10, fontWeight: 600 }}>Have questions? Reach out to the Sports Committee.</p>
      </div>
      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 32 }}>
        {[["📧", "Email", "sports@college.edu"], ["📞", "Phone", "+91 98765 43210"], ["📍", "Office", "Room 204, Block A"]].map(([ic, label, val]) => (
          <div key={label} style={{ background: T.bg, borderRadius: 18, boxShadow: T.shadow, padding: "1.2rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{ic}</div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: T.accent, textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontSize: 12, color: T.text2, fontWeight: 600, marginTop: 3 }}>{val}</div>
          </div>
        ))}
      </div>
      {!sent ? (
        <div style={{ background: T.bg, borderRadius: 24, boxShadow: T.shadow, padding: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input className="neu-input" placeholder="Your name" />
            <input className="neu-input" placeholder="Email address" type="email" />
            <textarea className="neu-input" placeholder="Your message..." rows={4} style={{ resize: "vertical" }} />
            <button className="neu-btn" onClick={() => setSent(true)} style={{
              background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
              color: "#fff", padding: "13px", fontSize: 15,
            }}>Send Message 📨</button>
          </div>
        </div>
      ) : (
        <div style={{ background: T.bg, borderRadius: 24, boxShadow: T.shadow, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
          <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.4rem", color: T.text, marginBottom: 8 }}>Message Sent!</div>
          <p style={{ color: T.text2, fontWeight: 600 }}>We'll get back to you within 24 hours.</p>
        </div>
      )}
    </div>
  );
}

/* ─── REGISTER ─── */
function RegisterPage({ T }) {
  const sports = [
    { icon: "🏃", name: "100m Sprint" }, { icon: "⚽", name: "Football" },
    { icon: "🏀", name: "Basketball" }, { icon: "🏏", name: "Cricket" },
    { icon: "🏐", name: "Volleyball" }, { icon: "🥊", name: "Arm Wrestling" },
    { icon: "🦅", name: "Long Jump" }, { icon: "💪", name: "Tug of War" },
    { icon: "🎾", name: "Table Tennis" }, { icon: "🏊", name: "Swimming" },
    { icon: "🤼", name: "Kabaddi" }, { icon: "🎯", name: "Javelin Throw" },
  ];
  const [selected, setSelected] = useState(new Set());
  const [size, setSize] = useState("M");
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [year, setYear] = useState("");
  const [dept, setDept] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [regId, setRegId] = useState("");
  const [shake, setShake] = useState(false);

  const toggleSport = s => {
    const n = new Set(selected);
    if (n.has(s)) n.delete(s); else if (n.size < 3) n.add(s);
    setSelected(n);
  };
  const submit = () => {
    if (!name || !roll || !year || selected.size === 0) {
      setShake(true); setTimeout(() => setShake(false), 500); return;
    }
    setRegId("SD26-" + Math.floor(1000 + Math.random() * 9000));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) return (
    <div style={{ maxWidth: 520, margin: "4rem auto", padding: "0 1.5rem" }}>
      <div style={{ background: T.bg, borderRadius: 28, boxShadow: T.shadow, padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: 12, animation: "pulse 0.8s 2" }}>🎉</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2rem", color: T.text, marginBottom: 8 }}>You're In!</h2>
        <p style={{ color: T.text2, fontWeight: 600, marginBottom: 28 }}>Registration confirmed! See you on April 10 🏆</p>
        <div style={{ background: T.bg, borderRadius: 20, boxShadow: T.shadowIn, padding: "1.8rem", textAlign: "left" }}>
          {[["Athlete", name], ["Roll No.", roll], ["Events", [...selected].join(", ")], ["T-Shirt", size]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.text2, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: T.text, textAlign: "right", maxWidth: "60%" }}>{v}</span>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.text2, textTransform: "uppercase", marginBottom: 4 }}>Registration ID</div>
            <div style={{ fontFamily: "monospace", fontSize: "1.6rem", fontWeight: 900, color: T.accent, letterSpacing: 4 }}>{regId}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: T.accent, textTransform: "uppercase", marginBottom: 8 }}>JOIN THE ACTION</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "clamp(2rem,5vw,2.6rem)", color: T.text }}>Register</h2>
        <p style={{ color: T.text2, marginTop: 8, fontWeight: 600 }}>Pick up to 3 events. Free for all students.</p>
      </div>
      <div style={{ background: T.bg, borderRadius: 28, boxShadow: T.shadow, padding: "2rem", animation: shake ? "shakeX 0.5s ease" : "none" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.text2, textTransform: "uppercase", marginBottom: 14 }}>Personal Details</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <input className="neu-input" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
          <div className="reg-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input className="neu-input" placeholder="Roll Number" value={roll} onChange={e => setRoll(e.target.value)} />
            <input className="neu-input" placeholder="Phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="reg-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <select className="neu-select" value={year} onChange={e => setYear(e.target.value)}>
              <option value="">Select Year</option>
              {["1st Year", "2nd Year", "3rd Year", "4th Year"].map(y => <option key={y}>{y}</option>)}
            </select>
            <select className="neu-select" value={dept} onChange={e => setDept(e.target.value)}>
              <option value="">Department</option>
              {["CS & IT", "Mechanical", "Civil", "Electronics", "MBA", "Commerce"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.text2, textTransform: "uppercase" }}>Choose Events</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.accent }}>{selected.size}/3 selected</div>
          </div>
          <div className="sports-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {sports.map(s => {
              const active = selected.has(s.name);
              return (
                <div key={s.name} onClick={() => toggleSport(s.name)} style={{
                  background: T.bg, borderRadius: 16,
                  boxShadow: active ? T.shadowIn : T.shadowSm,
                  padding: "12px 8px", textAlign: "center", cursor: "pointer",
                  border: active ? `2px solid ${T.accent}55` : "2px solid transparent",
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: active ? T.accent : T.text2 }}>{s.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20, marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.text2, textTransform: "uppercase", marginBottom: 14 }}>T-Shirt Size</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["XS", "S", "M", "L", "XL", "XXL"].map(s => (
              <div key={s} onClick={() => setSize(s)} style={{
                background: T.bg, borderRadius: 999,
                boxShadow: size === s ? T.shadowIn : T.shadowSm,
                padding: "8px 18px", cursor: "pointer", fontWeight: 800, fontSize: 13,
                color: size === s ? T.accent : T.text2,
                border: size === s ? `2px solid ${T.accent}55` : "2px solid transparent",
                transition: "all 0.2s",
              }}>{s}</div>
            ))}
          </div>
        </div>

        <button className="neu-btn" onClick={submit} style={{
          width: "100%", padding: "15px",
          fontFamily: "'Righteous', cursive", fontSize: 16, letterSpacing: 1,
          background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
          color: "#fff", boxShadow: "6px 6px 18px #d4855877", borderRadius: 16,
        }}>Confirm Registration 🚀</button>
      </div>
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer({ setPage, T }) {
  return (
    <footer style={{ background: T.footerBg, padding: "3rem 1.5rem 2rem", marginTop: "2rem", transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: "2.5rem" }}>
          <div>
            <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.4rem", color: T.accent, marginBottom: 10 }}>
              SPORTS<span style={{ color: T.text }}>DAY</span><span style={{ color: T.accent2 }}>26</span>
            </div>
            <p style={{ fontSize: 13, color: T.text2, lineHeight: 1.7, fontWeight: 600, maxWidth: 220 }}>Annual inter-college sports festival. 12 events, one epic day.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["📘", "📸", "🐦", "▶️"].map((ic, i) => (
                <div key={i} style={{ background: T.bg, borderRadius: 10, boxShadow: T.shadowSm, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", cursor: "pointer" }}>{ic}</div>
              ))}
            </div>
          </div>
          {[
            { title: "Navigate", links: ["Home", "About", "Events", "Register"] },
            { title: "Support", links: ["FAQs", "Contact", "Rules", "Schedule"] },
            { title: "Info", links: ["April 10, 2026", "North Campus", "8 AM – 7 PM", "Free Entry"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.accent, textTransform: "uppercase", marginBottom: 12 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map(l => (
                  <span key={l}
                    onClick={() => ["Home", "About", "Events", "Register", "FAQs", "Contact"].includes(l) && setPage(l.toLowerCase())}
                    style={{ fontSize: 13, color: T.text2, fontWeight: 600, cursor: "pointer" }}
                    onMouseEnter={e => e.target.style.color = T.accent}
                    onMouseLeave={e => e.target.style.color = T.text2}
                  >{l}</span>
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

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = useState("home");
  const [isDark, setIsDark] = useState(false);
  const T = isDark ? dark : light;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const pages = {
    home:     <><HeroSection setPage={setPage} T={T} /><Countdown T={T} /><EventsSection T={T} /><SponsorsSection T={T} /></>,
    about:    <AboutPage T={T} />,
    events:   <div style={{ paddingTop: "1rem" }}><EventsSection T={T} /></div>,
    faqs:     <FAQsPage T={T} />,
    contact:  <ContactPage T={T} />,
    register: <RegisterPage T={T} />,
  };

  return (
    <>
      <style>{makeGlobalStyle(isDark)}</style>
      <Navbar page={page} setPage={setPage} isDark={isDark} setIsDark={setIsDark} />
      <main style={{ minHeight: "80vh", background: T.bg, transition: "background 0.3s" }}>
        {pages[page] || pages["home"]}
      </main>
      {page !== "register" && <Footer setPage={setPage} T={T} />}
    </>
  );
}
