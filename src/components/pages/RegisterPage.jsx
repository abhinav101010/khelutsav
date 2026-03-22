import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import useFetch from "../../hooks/useFetch";
import API_BASE from "../../config";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function RegisterPage() {
  const { T } = useTheme();
  const navigate = useNavigate();
  const { data: events, loading: eventsLoading } = useFetch(`${API_BASE}/api/games`);

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [dept, setDept] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [size, setSize] = useState("M");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [regData, setRegData] = useState(null);
  const [shake, setShake] = useState(false);
  const [apiError, setApiError] = useState("");

  const toggleSport = (s) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else if (next.size < 3) next.add(s);
      return next;
    });
  };

  const submit = async () => {
    if (!name || !roll || !year || selected.size === 0) {
      setShake(true); setTimeout(() => setShake(false), 500); return;
    }
    setSubmitting(true);
    setApiError("");
    try {
      const res = await fetch(`${API_BASE}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, roll, phone, year, dept, events: [...selected], size }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setRegData(data);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && regData) return (
    <div style={{ maxWidth: 520, margin: "4rem auto", padding: "0 1.5rem" }}>
      <div style={{ background: T.bg, borderRadius: 28, boxShadow: T.shadow, padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: 12, animation: "pulse 0.8s 2" }}>🎉</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2rem", color: T.text, marginBottom: 8 }}>You're In!</h2>
        <p style={{ color: T.text2, fontWeight: 600, marginBottom: 28 }}>Registration confirmed! See you on April 10 🏆</p>
        <div style={{ background: T.bg, borderRadius: 20, boxShadow: T.shadowIn, padding: "1.8rem", textAlign: "left" }}>
          {[["Athlete", regData.name], ["Roll No.", regData.roll], ["Events", regData.events?.join(", ")], ["T-Shirt", regData.size]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.text2, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: T.text, textAlign: "right", maxWidth: "60%" }}>{v}</span>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.text2, textTransform: "uppercase", marginBottom: 4 }}>Registration ID</div>
            <div style={{ fontFamily: "monospace", fontSize: "1.6rem", fontWeight: 900, color: T.accent, letterSpacing: 4 }}>{regData.id}</div>
          </div>
        </div>
        <button className="neu-btn" onClick={() => navigate("/")} style={{ marginTop: 24, padding: "11px 28px", fontSize: 14, color: T.accent, borderRadius: 12 }}>
          ← Back to Home
        </button>
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

        {/* Personal Details */}
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

        {/* Event Selector */}
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.text2, textTransform: "uppercase" }}>Choose Events</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.accent }}>{selected.size}/3 selected</div>
          </div>
          {eventsLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {Array(12).fill(0).map((_, i) => (
                <div key={i} style={{ background: T.bg, borderRadius: 16, boxShadow: T.shadowSm, padding: "12px 8px", height: 72, animation: "pulse 1.4s ease-in-out infinite" }} />
              ))}
            </div>
          ) : (
            <div className="sports-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {events?.map(ev => {
                const active = selected.has(ev.name);
                const closed = ev.status !== "Open";
                return (
                  <div key={ev._id} onClick={() => !closed && toggleSport(ev.name)} style={{
                    background: T.bg, borderRadius: 16,
                    boxShadow: active ? T.shadowIn : T.shadowSm,
                    padding: "12px 8px", textAlign: "center",
                    cursor: closed ? "not-allowed" : "pointer",
                    border: active ? `2px solid ${T.accent}55` : "2px solid transparent",
                    opacity: closed ? 0.5 : 1,
                    transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>{ev.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: active ? T.accent : T.text2 }}>{ev.name}</div>
                    {closed && <div style={{ fontSize: 9, color: T.accent, fontWeight: 700, marginTop: 2 }}>{ev.status}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* T-Shirt Size */}
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20, marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: T.text2, textTransform: "uppercase", marginBottom: 14 }}>T-Shirt Size</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {SIZES.map(s => (
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

        {apiError && (
          <div style={{ marginBottom: 16, padding: "10px 16px", borderRadius: 12, background: "#fff0ea", color: T.accent, fontSize: 13, fontWeight: 700 }}>
            ⚠️ {apiError}
          </div>
        )}

        <button className="neu-btn" onClick={submit} disabled={submitting} style={{
          width: "100%", padding: "15px",
          fontFamily: "'Righteous', cursive", fontSize: 16, letterSpacing: 1,
          background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
          color: "#fff", boxShadow: "6px 6px 18px #d4855877", borderRadius: 16,
          opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer",
        }}>
          {submitting ? "Submitting..." : "Confirm Registration 🚀"}
        </button>
      </div>
    </div>
  );
}