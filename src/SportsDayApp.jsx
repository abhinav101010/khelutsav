import { useState, useEffect, useRef } from "react";

const N = {
  bg: "#e8eaf0",
  bg2: "#dfe1e8",
  text: "#2c2e3e",
  text2: "#7a7e99",
  accent: "#ff6b3d",
  accent2: "#ffb347",
  shadow: "8px 8px 22px #c5c7cf, -8px -8px 22px #ffffff",
  shadowSm: "4px 4px 12px #c5c7cf, -4px -4px 12px #ffffff",
  shadowIn: "inset 5px 5px 14px #c5c7cf, inset -5px -5px 14px #ffffff",
  shadowInSm: "inset 3px 3px 8px #c5c7cf, inset -3px -3px 8px #ffffff",
};

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Black+Ops+One&family=Righteous&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #e8eaf0; font-family: 'Nunito', sans-serif; color: #2c2e3e; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #dfe1e8; }
  ::-webkit-scrollbar-thumb { background: #b0b3c8; border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.04); }
  }
  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .fade-up { animation: fadeUp 0.6s ease both; }
  .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
  .fade-up-4 { animation: fadeUp 0.6s 0.4s ease both; }
  .float { animation: floatY 3s ease-in-out infinite; }
  .sponsor-track { display: flex; gap: 2rem; animation: scroll-left 18s linear infinite; width: max-content; }
  .sponsor-track:hover { animation-play-state: paused; }

  .neu-btn {
    background: #e8eaf0;
    border: none;
    border-radius: 14px;
    box-shadow: 5px 5px 14px #c5c7cf, -5px -5px 14px #ffffff;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    color: #2c2e3e;
    transition: all 0.18s;
  }
  .neu-btn:hover { box-shadow: 3px 3px 8px #c5c7cf, -3px -3px 8px #ffffff; transform: translateY(-1px); }
  .neu-btn:active { box-shadow: inset 4px 4px 10px #c5c7cf, inset -4px -4px 10px #ffffff; transform: translateY(0); }

  .neu-input {
    width: 100%;
    background: #e8eaf0;
    border: none;
    outline: none;
    border-radius: 14px;
    box-shadow: inset 5px 5px 12px #c5c7cf, inset -5px -5px 12px #ffffff;
    padding: 13px 18px;
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    color: #2c2e3e;
    transition: box-shadow 0.2s;
  }
  .neu-input::placeholder { color: #b0b3c8; font-weight: 400; }
  .neu-input:focus { box-shadow: inset 6px 6px 16px #c0c2ca, inset -4px -4px 10px #ffffff, 0 0 0 2.5px #ff6b3d44; }

  .neu-select {
    width: 100%;
    background: #e8eaf0;
    border: none;
    outline: none;
    border-radius: 14px;
    box-shadow: inset 5px 5px 12px #c5c7cf, inset -5px -5px 12px #ffffff;
    padding: 13px 18px;
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    color: #2c2e3e;
    appearance: none;
    cursor: pointer;
  }
`;

/* ─── NAV ─── */
function Navbar({ page, setPage }) {
  const links = ["Home", "About", "Events", "FAQs", "Contact"];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: "#e8eaf0",
      boxShadow: "0 6px 24px #c5c7cf66, 0 -1px 0 #fff",
      padding: "0 2.5rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    }}>
      <div
        onClick={() => setPage("home")}
        style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.25rem", color: N.accent, cursor: "pointer", letterSpacing: 1 }}>
        SPORTS<span style={{ color: N.text }}>DAY</span><span style={{ color: N.accent2 }}>26</span>
      </div>

      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {links.map(l => (
          <button key={l}
            onClick={() => setPage(l.toLowerCase())}
            style={{
              background: "none", border: "none",
              fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700,
              color: page === l.toLowerCase() ? N.accent : N.text2,
              padding: "7px 14px", borderRadius: 999, cursor: "pointer",
              boxShadow: page === l.toLowerCase() ? N.shadowInSm : "none",
              transition: "all 0.2s",
            }}>
            {l}
          </button>
        ))}
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

/* ─── HERO ─── */
function HeroSection({ setPage }) {
  return (
    <section style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "4rem 2rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* bg deco circles */}
      {[
        { size: 340, top: -80, left: -100, opacity: 0.45 },
        { size: 240, bottom: -60, right: -60, opacity: 0.35 },
        { size: 160, top: "40%", left: "8%", opacity: 0.25 },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          width: c.size, height: c.size,
          borderRadius: "50%",
          top: c.top, bottom: c.bottom, left: c.left, right: c.right,
          background: `radial-gradient(circle, ${N.accent}22, transparent 70%)`,
          pointerEvents: "none",
          opacity: c.opacity,
        }} />
      ))}

      <div className="fade-up" style={{
        background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
        color: "#fff", borderRadius: 999,
        padding: "6px 20px", fontSize: 11,
        fontWeight: 800, letterSpacing: 2.5,
        textTransform: "uppercase", marginBottom: 20,
        boxShadow: "4px 4px 12px #d4855866",
        display: "inline-block",
      }}>🏆 Annual College Sports Day 2026</div>

      <h1 className="fade-up-1" style={{
        fontFamily: "'Black Ops One', cursive",
        fontSize: "clamp(3rem, 9vw, 6.5rem)",
        lineHeight: 1.0,
        color: N.text,
        marginBottom: 16,
        letterSpacing: "-1px",
      }}>
        UNITE.<br />
        <span style={{
          background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>COMPETE.</span><br />
        CELEBRATE.
      </h1>

      <p className="fade-up-2" style={{
        fontSize: 17, color: N.text2, maxWidth: 480,
        lineHeight: 1.7, marginBottom: 36, fontWeight: 600,
      }}>
        The biggest inter-college sports festival of the year is here. 12 events, 600+ athletes, one unforgettable day.
      </p>

      <div className="fade-up-3" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
        <button className="neu-btn" onClick={() => setPage("register")}
          style={{
            background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
            color: "#fff", padding: "14px 32px", fontSize: 15, borderRadius: 16,
            boxShadow: "6px 6px 18px #d4855877, -2px -2px 8px #fff",
          }}>
          Register Now 🚀
        </button>
        <button className="neu-btn" onClick={() => document.getElementById("events-section").scrollIntoView({ behavior: "smooth" })}
          style={{ padding: "14px 32px", fontSize: 15, borderRadius: 16, color: N.accent }}>
          View Events →
        </button>
      </div>

      {/* Stats row */}
      <div className="fade-up-4" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {[["12", "Events"], ["600+", "Athletes"], ["April 18", "Event Date"], ["₹50K", "Prize Pool"]].map(([val, label]) => (
          <div key={label} style={{
            background: N.bg, borderRadius: 20,
            boxShadow: N.shadow,
            padding: "18px 28px", textAlign: "center", minWidth: 110,
          }}>
            <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.7rem", color: N.accent, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: N.text2, marginTop: 4, letterSpacing: 1 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Floating emojis */}
      {["🏃", "⚽", "🏀", "🏏", "🥊"].map((e, i) => (
        <div key={i} className="float" style={{
          position: "absolute",
          fontSize: "2.2rem",
          opacity: 0.15,
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

/* ─── EVENTS SECTION ─── */
function EventsSection() {
  const events = [
    { icon: "🏃", name: "100m Sprint", date: "Apr 18, 9:00 AM", venue: "Main Track", slots: 32, tag: "Individual" },
    { icon: "⚽", name: "Football", date: "Apr 18, 10:30 AM", venue: "Ground A", slots: 8, tag: "Team" },
    { icon: "🏀", name: "Basketball", date: "Apr 18, 12:00 PM", venue: "Court 1", slots: 8, tag: "Team" },
    { icon: "🏏", name: "Cricket", date: "Apr 18, 9:30 AM", venue: "Ground B", slots: 4, tag: "Team" },
    { icon: "🏐", name: "Volleyball", date: "Apr 18, 2:00 PM", venue: "Court 2", slots: 8, tag: "Team" },
    { icon: "🥊", name: "Arm Wrestling", date: "Apr 18, 3:00 PM", venue: "Hall C", slots: 16, tag: "Individual" },
    { icon: "🦅", name: "Long Jump", date: "Apr 18, 11:00 AM", venue: "Pit Area", slots: 20, tag: "Individual" },
    { icon: "💪", name: "Tug of War", date: "Apr 18, 4:00 PM", venue: "Main Ground", slots: 6, tag: "Team" },
    { icon: "🎾", name: "Table Tennis", date: "Apr 18, 10:00 AM", venue: "Hall A", slots: 24, tag: "Individual" },
    { icon: "🏊", name: "Swimming", date: "Apr 18, 8:00 AM", venue: "Pool", slots: 16, tag: "Individual" },
    { icon: "🤼", name: "Kabaddi", date: "Apr 18, 1:00 PM", venue: "Ground C", slots: 6, tag: "Team" },
    { icon: "🎯", name: "Javelin Throw", date: "Apr 18, 3:30 PM", venue: "Field Zone", slots: 20, tag: "Individual" },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <section id="events-section" style={{ padding: "5rem 2.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: N.accent, textTransform: "uppercase", marginBottom: 8 }}>WHAT'S ON</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.8rem", color: N.text, lineHeight: 1.1 }}>
          Games & Events
        </h2>
        <p style={{ color: N.text2, marginTop: 10, fontWeight: 600 }}>Pick your battle. Register before slots fill up!</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {events.map((ev, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: N.bg, borderRadius: 22,
              boxShadow: hovered === i
                ? `12px 12px 28px #c5c7cf, -8px -8px 22px #ffffff`
                : N.shadow,
              padding: "1.5rem",
              transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
              transition: "all 0.25s",
              cursor: "default",
              position: "relative", overflow: "hidden",
            }}>

            <div style={{
              position: "absolute", top: -10, right: -10,
              width: 80, height: 80,
              background: `radial-gradient(circle, ${N.accent}18, transparent)`,
              borderRadius: "50%",
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: "2.2rem" }}>{ev.icon}</span>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: 1,
                padding: "4px 10px", borderRadius: 999,
                background: ev.tag === "Team" ? "#e0f0ff" : "#fff0ea",
                color: ev.tag === "Team" ? "#1a6fa8" : N.accent,
                boxShadow: N.shadowInSm,
              }}>{ev.tag}</span>
            </div>

            <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.15rem", color: N.text, marginBottom: 10 }}>{ev.name}</div>

            <div style={{ fontSize: 12, color: N.text2, fontWeight: 600, lineHeight: 1.9 }}>
              <div>📅 {ev.date}</div>
              <div>📍 {ev.venue}</div>
            </div>

            <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{
                background: N.bg, borderRadius: 10,
                boxShadow: N.shadowInSm,
                padding: "5px 12px", fontSize: 11, fontWeight: 800, color: N.text2,
              }}>
                {ev.slots} slots
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "3px 3px 8px #d4855855",
                fontSize: 13,
              }}>→</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── SPONSORS ─── */
function SponsorsSection() {
  const sponsors = [
    { name: "RedBull", color: "#cc0000", emoji: "🔴" },
    { name: "Nike", color: "#111", emoji: "✔️" },
    { name: "Adidas", color: "#0066cc", emoji: "〽️" },
    { name: "Puma", color: "#e60000", emoji: "🐆" },
    { name: "Decathlon", color: "#0082c8", emoji: "🏬" },
    { name: "BoostUp", color: "#ff6600", emoji: "⚡" },
    { name: "FitLife", color: "#2e7d32", emoji: "🌿" },
    { name: "SportZone", color: "#7b1fa2", emoji: "🎯" },
  ];

  const doubled = [...sponsors, ...sponsors];

  return (
    <section style={{ padding: "4rem 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem", padding: "0 2rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: N.accent, textTransform: "uppercase", marginBottom: 6 }}>POWERED BY</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2rem", color: N.text }}>Our Sponsors</h2>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
          background: `linear-gradient(to right, ${N.bg}, transparent)`,
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
          background: `linear-gradient(to left, ${N.bg}, transparent)`,
          zIndex: 2, pointerEvents: "none",
        }} />

        <div style={{ overflow: "hidden", padding: "1rem 0" }}>
          <div className="sponsor-track">
            {doubled.map((s, i) => (
              <div key={i} style={{
                background: N.bg, borderRadius: 20,
                boxShadow: N.shadow,
                padding: "1.2rem 2rem",
                display: "flex", alignItems: "center", gap: 12,
                minWidth: 160, flexShrink: 0,
                whiteSpace: "nowrap",
              }}>
                <span style={{ fontSize: "1.8rem" }}>{s.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1rem", color: s.color }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: N.text2, fontWeight: 700, letterSpacing: 1 }}>SPONSOR</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT PAGE ─── */
function AboutPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "4rem 2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: N.accent, textTransform: "uppercase", marginBottom: 8 }}>WHO WE ARE</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.8rem", color: N.text }}>About Sports Day</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {[
          { icon: "🏆", title: "Our Legacy", text: "Running for 12 years, Sports Day has grown to become the most-awaited annual event at our college, uniting students from all departments." },
          { icon: "🎯", title: "Our Mission", text: "To foster sportsmanship, team spirit, and physical wellness among college students through healthy competition and community bonding." },
          { icon: "🌟", title: "What to Expect", text: "12 competitive events, live DJ, food stalls, prize distribution, and an energy that'll make you come back every year." },
          { icon: "🤝", title: "Inclusivity", text: "From first years to final years — everyone competes. Solo athletes, team players, cheerleaders, and volunteers all welcome." },
        ].map((c, i) => (
          <div key={i} style={{ background: N.bg, borderRadius: 22, boxShadow: N.shadow, padding: "1.8rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.1rem", color: N.text, marginBottom: 8 }}>{c.title}</div>
            <p style={{ fontSize: 14, color: N.text2, lineHeight: 1.7, fontWeight: 600 }}>{c.text}</p>
          </div>
        ))}
      </div>

      <div style={{ background: N.bg, borderRadius: 24, boxShadow: N.shadow, padding: "2rem", textAlign: "center" }}>
        <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.5rem", color: N.text, marginBottom: 10 }}>
          Event Day: <span style={{ color: N.accent }}>April 18, 2026</span>
        </div>
        <p style={{ color: N.text2, fontWeight: 600 }}>Gates open at 8:00 AM · Main Ground, North Campus · Entry Free for all registered participants</p>
      </div>
    </div>
  );
}

/* ─── FAQS PAGE ─── */
function FAQsPage() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["Who can participate?", "All currently enrolled college students with a valid ID can participate. Students from all years and departments are welcome."],
    ["How many events can I register for?", "You can register for up to 3 events. Teams must have a minimum of 5 members for team sports."],
    ["Is there a registration fee?", "Nope! Registration is completely free for all students. Just bring your college ID on event day."],
    ["What do I win?", "Winners receive trophies, medals, and cash prizes. The overall champion team wins the rolling trophy + ₹50,000 prize pool."],
    ["Can I register on the day?", "On-spot registration is available until 8:30 AM but slots are limited — we strongly recommend registering online."],
    ["What should I wear?", "Comfortable sportswear and appropriate footwear. Each registered participant gets a free Sports Day 2026 T-shirt."],
    ["Is there food available?", "Yes! Multiple food stalls and a hydration station will be set up throughout the day."],
    ["How do I know if I'm confirmed?", "After registering, you'll receive a unique registration ID. Keep it saved — you'll need it at the check-in desk."],
  ];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: N.accent, textTransform: "uppercase", marginBottom: 8 }}>GOT QUESTIONS?</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.8rem", color: N.text }}>FAQs</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {faqs.map(([q, a], i) => (
          <div key={i}
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              background: N.bg, borderRadius: 18,
              boxShadow: open === i ? "inset 5px 5px 14px #c5c7cf, inset -5px -5px 14px #ffffff" : N.shadow,
              padding: "1.2rem 1.5rem",
              cursor: "pointer", transition: "all 0.25s",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: 15, color: open === i ? N.accent : N.text }}>{q}</span>
              <span style={{ fontSize: 18, color: N.accent, fontWeight: 900, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </div>
            {open === i && (
              <p style={{ marginTop: 12, fontSize: 14, color: N.text2, lineHeight: 1.7, fontWeight: 600, borderTop: "1px solid #d8dae3", paddingTop: 12 }}>{a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTACT PAGE ─── */
function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: N.accent, textTransform: "uppercase", marginBottom: 8 }}>GET IN TOUCH</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.8rem", color: N.text }}>Contact Us</h2>
        <p style={{ color: N.text2, marginTop: 10, fontWeight: 600 }}>Have questions or concerns? Reach out to the Sports Committee.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 32 }}>
        {[["📧", "Email", "sports@college.edu"], ["📞", "Phone", "+91 98765 43210"], ["📍", "Office", "Room 204, Block A"]].map(([ic, label, val]) => (
          <div key={label} style={{ background: N.bg, borderRadius: 18, boxShadow: N.shadow, padding: "1.2rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{ic}</div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: N.accent, textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontSize: 12, color: N.text2, fontWeight: 600, marginTop: 3 }}>{val}</div>
          </div>
        ))}
      </div>

      {!sent ? (
        <div style={{ background: N.bg, borderRadius: 24, boxShadow: N.shadow, padding: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input className="neu-input" placeholder="Your name" />
            <input className="neu-input" placeholder="Email address" type="email" />
            <textarea className="neu-input" placeholder="Your message..." rows={4} style={{ resize: "vertical" }} />
            <button className="neu-btn" onClick={() => setSent(true)} style={{
              background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
              color: "#fff", padding: "13px", fontSize: 15,
              boxShadow: "5px 5px 14px #d4855866, -2px -2px 8px #fff",
            }}>Send Message 📨</button>
          </div>
        </div>
      ) : (
        <div style={{ background: N.bg, borderRadius: 24, boxShadow: N.shadow, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
          <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.4rem", color: N.text, marginBottom: 8 }}>Message Sent!</div>
          <p style={{ color: N.text2, fontWeight: 600 }}>We'll get back to you within 24 hours.</p>
        </div>
      )}
    </div>
  );
}

/* ─── REGISTER PAGE ─── */
function RegisterPage() {
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

  const toggleSport = (s) => {
    const n = new Set(selected);
    if (n.has(s)) n.delete(s);
    else if (n.size < 3) n.add(s);
    setSelected(n);
  };

  const submit = () => {
    if (!name || !roll || !year || selected.size === 0) return;
    setRegId("SD26-" + Math.floor(1000 + Math.random() * 9000));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) return (
    <div style={{ maxWidth: 520, margin: "4rem auto", padding: "0 1.5rem" }}>
      <div style={{ background: N.bg, borderRadius: 28, boxShadow: N.shadow, padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: 12, animation: "pulse 1s 2" }}>🎉</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2rem", color: N.text, marginBottom: 8 }}>You're In!</h2>
        <p style={{ color: N.text2, fontWeight: 600, marginBottom: 28 }}>Registration confirmed! See you on April 18 🏆</p>

        <div style={{ background: N.bg, borderRadius: 20, boxShadow: N.shadowIn, padding: "1.8rem", textAlign: "left" }}>
          {[["Athlete", name], ["Roll No.", roll], ["Events", [...selected].join(", ")], ["T-Shirt", size]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #d8dae3" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: N.text2, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: N.text }}>{v}</span>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: N.text2, textTransform: "uppercase", marginBottom: 4 }}>Registration ID</div>
            <div style={{ fontFamily: "monospace", fontSize: "1.6rem", fontWeight: 900, color: N.accent, letterSpacing: 4 }}>{regId}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: N.accent, textTransform: "uppercase", marginBottom: 8 }}>JOIN THE ACTION</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.6rem", color: N.text }}>Register</h2>
        <p style={{ color: N.text2, marginTop: 8, fontWeight: 600 }}>Pick up to 3 events. Free for all students.</p>
      </div>

      <div style={{ background: N.bg, borderRadius: 28, boxShadow: N.shadow, padding: "2rem" }}>

        {/* Personal Details */}
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: N.text2, textTransform: "uppercase", marginBottom: 14 }}>Personal Details</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <input className="neu-input" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input className="neu-input" placeholder="Roll Number" value={roll} onChange={e => setRoll(e.target.value)} />
            <input className="neu-input" placeholder="Phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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

        {/* Sports */}
        <div style={{ borderTop: "1px solid #d8dae3", paddingTop: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: N.text2, textTransform: "uppercase" }}>Choose Events</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: N.accent }}>{selected.size}/3 selected</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {sports.map((s) => {
              const active = selected.has(s.name);
              return (
                <div key={s.name}
                  onClick={() => toggleSport(s.name)}
                  style={{
                    background: N.bg, borderRadius: 16,
                    boxShadow: active ? N.shadowIn : N.shadowSm,
                    padding: "12px 8px", textAlign: "center", cursor: "pointer",
                    border: active ? `2px solid ${N.accent}44` : "2px solid transparent",
                    transition: "all 0.2s",
                  }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: active ? N.accent : N.text2 }}>{s.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* T-shirt size */}
        <div style={{ borderTop: "1px solid #d8dae3", paddingTop: 20, marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: N.text2, textTransform: "uppercase", marginBottom: 14 }}>T-Shirt Size</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["XS", "S", "M", "L", "XL", "XXL"].map(s => (
              <div key={s} onClick={() => setSize(s)}
                style={{
                  background: N.bg, borderRadius: 999,
                  boxShadow: size === s ? N.shadowIn : N.shadowSm,
                  padding: "8px 18px", cursor: "pointer",
                  fontWeight: 800, fontSize: 13,
                  color: size === s ? N.accent : N.text2,
                  border: size === s ? `2px solid ${N.accent}44` : "2px solid transparent",
                  transition: "all 0.2s",
                }}>{s}</div>
            ))}
          </div>
        </div>

        <button className="neu-btn" onClick={submit} style={{
          width: "100%", padding: "15px",
          fontFamily: "'Righteous', cursive", fontSize: 16, letterSpacing: 1,
          background: `linear-gradient(135deg, ${N.accent}, ${N.accent2})`,
          color: "#fff",
          boxShadow: "6px 6px 18px #d4855877, -2px -2px 8px #fff",
          borderRadius: 16,
        }}>
          Confirm Registration 🚀
        </button>
      </div>
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#dfe1e8", padding: "3rem 2.5rem 2rem", marginTop: "2rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: "2.5rem" }}>
          <div>
            <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.4rem", color: N.accent, marginBottom: 10 }}>
              SPORTS<span style={{ color: N.text }}>DAY</span><span style={{ color: N.accent2 }}>26</span>
            </div>
            <p style={{ fontSize: 13, color: N.text2, lineHeight: 1.7, fontWeight: 600, maxWidth: 220 }}>
              Annual inter-college sports festival. 12 events, one epic day.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["📘", "📸", "🐦", "▶️"].map((ic, i) => (
                <div key={i} style={{ background: N.bg, borderRadius: 10, boxShadow: N.shadowSm, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", cursor: "pointer" }}>{ic}</div>
              ))}
            </div>
          </div>

          {[
            { title: "Navigate", links: ["Home", "About", "Events", "Register"] },
            { title: "Support", links: ["FAQs", "Contact", "Rules", "Schedule"] },
            { title: "Info", links: ["April 18, 2026", "North Campus", "8 AM – 7 PM", "Free Entry"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: N.accent, textTransform: "uppercase", marginBottom: 12 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map(l => (
                  <span key={l}
                    onClick={() => ["Home", "About", "Events", "Register"].includes(l) && setPage(l.toLowerCase())}
                    style={{ fontSize: 13, color: N.text2, fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = N.accent}
                    onMouseLeave={e => e.target.style.color = N.text2}
                  >{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #c5c7cf", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: N.text2, fontWeight: 600 }}>© 2026 Sports Day Committee. All rights reserved.</span>
          <span style={{ fontSize: 12, color: N.text2, fontWeight: 600 }}>Made with ❤️ by the Events Team</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── HOME PAGE (assembled) ─── */
function HomePage({ setPage }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <EventsSection />
      <SponsorsSection />
    </>
  );
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage />,
    events: <div style={{ paddingTop: "1rem" }}><EventsSection /></div>,
    faqs: <FAQsPage />,
    contact: <ContactPage />,
    register: <RegisterPage />,
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const showFooter = page !== "register";

  return (
    <>
      <style>{globalStyle}</style>
      <Navbar page={page} setPage={setPage} />
      <main style={{ minHeight: "80vh" }}>
        {pages[page] || pages["home"]}
      </main>
      {showFooter && <Footer setPage={setPage} />}
    </>
  );
}
