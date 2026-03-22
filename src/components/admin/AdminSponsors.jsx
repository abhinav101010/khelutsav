import { useState, useEffect } from "react";
import API_BASE from "../../config";

const A = { bg: "#0f1117", surface: "#1a1d2e", border: "#2a2d42", text: "#e8eaf5", text2: "#6b7280", accent: "#ff6b3d", accent2: "#ffb347" };
const EMPTY = { name: "", tier: "Bronze", color: "#ff6b3d", emoji: "🏢", since: "2026", amount: "", status: "Pending" };
const TIER_COLOR = { Gold: "#f59e0b", Silver: "#94a3b8", Bronze: "#cd7f32" };

const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: A.text2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{
      width: "100%", background: A.bg, border: `1px solid ${A.border}`, borderRadius: 10,
      padding: "10px 12px", color: A.text, fontFamily: "'Nunito', sans-serif",
      fontWeight: 700, fontSize: 13, outline: "none", boxSizing: "border-box",
    }} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: A.text2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      width: "100%", background: A.bg, border: `1px solid ${A.border}`, borderRadius: 10,
      padding: "10px 12px", color: A.text, fontFamily: "'Nunito', sans-serif",
      fontWeight: 700, fontSize: 13, outline: "none", boxSizing: "border-box", cursor: "pointer",
    }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/sponsors`)
      .then(r => r.json())
      .then(d => { setSponsors(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditing(s._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const save = async () => {
    if (!form.name) return;
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API_BASE}/api/sponsors/${editing}` : `${API_BASE}/api/sponsors`;
    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (editing) setSponsors(prev => prev.map(s => s._id === editing ? data : s));
    else setSponsors(prev => [...prev, data]);
    setSaving(false);
    closeForm();
  };

  const deleteSponsor = async (id) => {
    if (!window.confirm("Delete this sponsor?")) return;
    setDeleting(id);
    await fetch(`${API_BASE}/api/sponsors/${id}`, { method: "DELETE" });
    setSponsors(prev => prev.filter(s => s._id !== id));
    setDeleting(null);
  };

  const STATUS_COLOR = { Active: "#22c55e", Pending: "#f59e0b", Inactive: "#ef4444" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.8rem", color: A.text }}>Sponsors</h1>
          <p style={{ color: A.text2, fontWeight: 600, marginTop: 4 }}>{sponsors.length} sponsors · {sponsors.filter(s => s.status === "Active").length} active</p>
        </div>
        <button onClick={openAdd} style={{
          background: `linear-gradient(135deg, ${A.accent}, ${A.accent2})`, border: "none",
          borderRadius: 12, padding: "10px 20px", color: "#fff", cursor: "pointer",
          fontFamily: "'Righteous', cursive", fontSize: 14,
          boxShadow: "0 4px 16px #ff6b3d44",
        }}>+ Add Sponsor</button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "#00000088", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: A.surface, borderRadius: 24, padding: "2rem", width: "100%", maxWidth: 480, border: `1px solid ${A.border}`, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Black Ops One', cursive", color: A.text, fontSize: "1.3rem" }}>{editing ? "Edit Sponsor" : "Add Sponsor"}</h2>
              <button onClick={closeForm} style={{ background: "none", border: "none", color: A.text2, cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 12 }}>
                <Input label="Emoji" value={form.emoji} onChange={v => setForm(f => ({ ...f, emoji: v }))} />
                <Input label="Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Select label="Tier" value={form.tier} onChange={v => setForm(f => ({ ...f, tier: v }))} options={["Gold", "Silver", "Bronze"]} />
                <Select label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={["Active", "Pending", "Inactive"]} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Input label="Color (hex)" value={form.color} onChange={v => setForm(f => ({ ...f, color: v }))} />
                <Input label="Amount (₹)" value={form.amount} onChange={v => setForm(f => ({ ...f, amount: v }))} />
              </div>
              <Input label="Since (year)" value={form.since} onChange={v => setForm(f => ({ ...f, since: v }))} />
              {/* Color preview */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: A.bg, borderRadius: 10, border: `1px solid ${A.border}` }}>
                <span style={{ fontSize: "1.8rem" }}>{form.emoji}</span>
                <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1rem", color: form.color }}>{form.name || "Preview"}</div>
                <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 800, color: TIER_COLOR[form.tier] || A.text2 }}>{form.tier?.toUpperCase()}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: "1.5rem" }}>
              <button onClick={closeForm} style={{
                flex: 1, padding: "12px", background: A.bg, border: `1px solid ${A.border}`,
                borderRadius: 12, color: A.text2, cursor: "pointer",
                fontFamily: "'Nunito', sans-serif", fontWeight: 800,
              }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{
                flex: 2, padding: "12px",
                background: `linear-gradient(135deg, ${A.accent}, ${A.accent2})`,
                border: "none", borderRadius: 12, color: "#fff", cursor: "pointer",
                fontFamily: "'Righteous', cursive", fontSize: 14,
              }}>{saving ? "Saving..." : editing ? "Save Changes" : "Add Sponsor"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Tier groups */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={{ background: A.surface, borderRadius: 16, height: 130, animation: "pulse 1.4s infinite", border: `1px solid ${A.border}` }} />
          ))}
        </div>
      ) : (
        ["Gold", "Silver", "Bronze"].map(tier => {
          const tierSponsors = sponsors.filter(s => s.tier === tier);
          if (tierSponsors.length === 0) return null;
          return (
            <div key={tier} style={{ marginBottom: "2rem" }}>
              <div style={{
                fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase",
                color: TIER_COLOR[tier], marginBottom: 12, display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{ height: 1, flex: 1, background: `${TIER_COLOR[tier]}44` }} />
                {tier} Tier
                <div style={{ height: 1, flex: 1, background: `${TIER_COLOR[tier]}44` }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                {tierSponsors.map(s => (
                  <div key={s._id} style={{
                    background: A.surface, borderRadius: 18, padding: "1.2rem",
                    border: `1px solid ${A.border}`, position: "relative",
                  }}>
                    <div style={{ position: "absolute", top: -1, left: -1, right: -1, height: 3, background: `linear-gradient(90deg, ${s.color}, transparent)`, borderRadius: "18px 18px 0 0" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: "2rem" }}>{s.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1rem", color: s.color }}>{s.name}</div>
                        <div style={{ fontSize: 10, color: A.text2, fontWeight: 700 }}>Since {s.since}</div>
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 999,
                        color: STATUS_COLOR[s.status], background: `${STATUS_COLOR[s.status]}18`,
                        border: `1px solid ${STATUS_COLOR[s.status]}33`,
                      }}>{s.status}</span>
                    </div>
                    {s.amount && <div style={{ fontSize: 12, color: A.text2, fontWeight: 700, marginBottom: 10 }}>💰 ₹{s.amount}</div>}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(s)} style={{
                        flex: 1, padding: "7px 0", background: `${A.accent}18`, border: `1px solid ${A.accent}33`,
                        borderRadius: 8, color: A.accent, cursor: "pointer",
                        fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 12,
                      }}>✏️ Edit</button>
                      <button onClick={() => deleteSponsor(s._id)} disabled={deleting === s._id} style={{
                        padding: "7px 12px", background: "#ef444418", border: "1px solid #ef444433",
                        borderRadius: 8, color: "#ef4444", cursor: "pointer",
                        fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 12,
                      }}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  );
}