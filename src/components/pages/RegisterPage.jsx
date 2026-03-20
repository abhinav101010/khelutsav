import { useState } from "react";
import N from "../../theme";
import SportSelector from "./SportSelector";
import TShirtSizePicker from "./TShirtSizePicker";
import RegistrationTicket from "./RegistrationTicket";

export default function RegisterPage({ setPage }) {
  const [name,      setName]      = useState("");
  const [roll,      setRoll]      = useState("");
  const [phone,     setPhone]     = useState("");
  const [year,      setYear]      = useState("");
  const [dept,      setDept]      = useState("");
  const [selected,  setSelected]  = useState(new Set());
  const [size,      setSize]      = useState("M");
  const [submitted, setSubmitted] = useState(false);
  const [regId,     setRegId]     = useState("");

  /* Toggle a sport — max 3 */
  const toggleSport = (sportName) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(sportName)) next.delete(sportName);
      else if (next.size < 3) next.add(sportName);
      return next;
    });
  };

  /* Submit */
  const handleSubmit = () => {
    if (!name || !roll || !year || selected.size === 0) return;
    setRegId("SD26-" + Math.floor(1000 + Math.random() * 9000));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Show ticket after submission */
  if (submitted) {
    return (
      <RegistrationTicket
        name={name} roll={roll}
        selected={selected} size={size}
        regId={regId}
        onBack={() => setPage("home")}
      />
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 3,
          color: N.accent, textTransform: "uppercase", marginBottom: 8,
        }}>JOIN THE ACTION</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.6rem", color: N.text }}>
          Register
        </h2>
        <p style={{ color: N.text2, marginTop: 8, fontWeight: 600 }}>
          Pick up to 3 events. Free for all students.
        </p>
      </div>

      <div style={{ background: N.bg, borderRadius: 28, boxShadow: N.shadow, padding: "2rem" }}>

        {/* ── Personal details ── */}
        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: 2,
          color: N.text2, textTransform: "uppercase", marginBottom: 14,
        }}>Personal Details</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <input
            className="neu-input" placeholder="Full Name"
            value={name} onChange={e => setName(e.target.value)}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              className="neu-input" placeholder="Roll Number"
              value={roll} onChange={e => setRoll(e.target.value)}
            />
            <input
              className="neu-input" placeholder="Phone" type="tel"
              value={phone} onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <select className="neu-select" value={year} onChange={e => setYear(e.target.value)}>
              <option value="">Select Year</option>
              {["1st Year", "2nd Year", "3rd Year", "4th Year"].map(y => (
                <option key={y}>{y}</option>
              ))}
            </select>
            <select className="neu-select" value={dept} onChange={e => setDept(e.target.value)}>
              <option value="">Department</option>
              {["CS & IT", "Mechanical", "Civil", "Electronics", "MBA", "Commerce"].map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Sport selector ── */}
        <SportSelector selected={selected} onToggle={toggleSport} />

        {/* ── T-shirt size ── */}
        <TShirtSizePicker size={size} onChange={setSize} />

        {/* ── Submit button ── */}
        <button className="neu-btn" onClick={handleSubmit} style={{
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
