import { useState, useEffect } from "react";
import API_BASE from "../../config";

const A = { bg: "#0f1117", surface: "#1a1d2e", border: "#2a2d42", text: "#e8eaf5", text2: "#6b7280", accent: "#ff6b3d", accent2: "#ffb347" };

const EMPTY = { icon: "🏅", name: "", date: "", venue: "", slots: 16, tag: "Individual", status: "Open", winner: "" };

const Input = ({ label, value, onChange, type = "text", children }) => (
  <div>
    <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: A.text2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
    {children || (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{
        width: "100%", background: A.bg, border: `1px solid ${A.border}`, borderRadius: 10,
        padding: "10px 12px", color: A.text, fontFamily: "'Nunito', sans-serif",
        fontWeight: 700, fontSize: 13, outline: "none", boxSizing: "border-box",
      }} />
    )}
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <Input label={label}>
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      width: "100%", background: A.bg, border: `1px solid ${A.border}`, borderRadius: 10,
      padding: "10px 12px", color: A.text, fontFamily: "'Nunito', sans-serif",
      fontWeight: 700, fontSize: 13, outline: "none", boxSizing: "border-box", cursor: "pointer",
    }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </Input>
);

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/games`)
      .then(r => r.json())
      .then(d => { setEvents(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (ev) => { setForm({ ...ev }); setEditing(ev._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const save = async () => {
    if (!form.name) return;
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API_BASE}/api/games/${editing}` : `${API_BASE}/api/games`;
    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (editing) setEvents(prev => prev.map(e => e._id === editing ? data : e));
    else setEvents(prev => [data, ...prev]);
    setSaving(false);
    closeForm();
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    setDeleting(id);
    await fetch(`${API_BASE}/api/games/${id}`, { method: "DELETE" });
    setEvents(prev => prev.filter(e => e._id !== id));
    setDeleting(null);
  };

  const STATUS_COLOR = { Open: "#22c55e", "In Progress": "#f59e0b", Completed: "#3b82f6", Cancelled: "#ef4444" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.8rem", color: A.text }}>Events</h1>
          <p style={{ color: A.text2, fontWeight: 600, marginTop: 4 }}>{events.length} events configured</p>
        </div>
        <button onClick={openAdd} style={{
          background: `linear-gradient(135deg, ${A.accent}, ${A.accent2})`, border: "none",
          borderRadius: 12, padding: "10px 20px", color: "#fff", cursor: "pointer",
          fontFamily: "'Righteous', cursive", fontSize: 14,
          boxShadow: "0 4px 16px #ff6b3d44",
        }}>+ Add Event</button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "#00000088", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: A.surface, borderRadius: 24, padding: "2rem", width: "100%", maxWidth: 540, border: `1px solid ${A.border}`, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Black Ops One', cursive", color: A.text, fontSize: "1.3rem" }}>{editing ? "Edit Event" : "Add Event"}</h2>
              <button onClick={closeForm} style={{ background: "none", border: "none", color: A.text2, cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 12 }}>
                <Input label="Icon" value={form.icon} onChange={v => setForm(f => ({ ...f, icon: v }))} />
                <Input label="Event Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Input label="Date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} placeholder="Apr 10, 9:00 AM" />
                <Input label="Venue" value={form.venue} onChange={v => setForm(f => ({ ...f, venue: v }))} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <Input label="Slots" value={form.slots} onChange={v => setForm(f => ({ ...f, slots: Number(v) }))} type="number" />
                <Select label="Tag" value={form.tag} onChange={v => setForm(f => ({ ...f, tag: v }))} options={["Individual", "Team"]} />
                <Select label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={["Open", "In Progress", "Completed", "Cancelled"]} />
              </div>
              {form.status === "Completed" && (
                <Input label="Winner" value={form.winner} onChange={v => setForm(f => ({ ...f, winner: v }))} />
              )}
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
              }}>{saving ? "Saving..." : editing ? "Save Changes" : "Add Event"}</button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={{ background: A.surface, borderRadius: 16, height: 140, animation: "pulse 1.4s infinite", border: `1px solid ${A.border}` }} />
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {events.map(ev => (
            <div key={ev._id} style={{ background: A.surface, borderRadius: 18, padding: "1.2rem", border: `1px solid ${A.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontSize: "1.8rem" }}>{ev.icon}</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 999,
                    color: STATUS_COLOR[ev.status] || A.text2,
                    background: `${STATUS_COLOR[ev.status]}18`,
                    border: `1px solid ${STATUS_COLOR[ev.status]}33`,
                  }}>{ev.status}</span>
                </div>
              </div>
              <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1rem", color: A.text, marginBottom: 6 }}>{ev.name}</div>
              <div style={{ fontSize: 12, color: A.text2, fontWeight: 600, lineHeight: 1.8 }}>
                <div>📅 {ev.date}</div>
                <div>📍 {ev.venue}</div>
                <div>🎟 {ev.slots} slots · <span style={{ color: ev.tag === "Team" ? "#3b82f6" : A.accent }}>{ev.tag}</span></div>
                {ev.winner && <div style={{ color: "#f59e0b" }}>🏆 {ev.winner}</div>}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button onClick={() => openEdit(ev)} style={{
                  flex: 1, padding: "7px 0", background: `${A.accent}18`, border: `1px solid ${A.accent}33`,
                  borderRadius: 8, color: A.accent, cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 12,
                }}>✏️ Edit</button>
                <button onClick={() => deleteEvent(ev._id)} disabled={deleting === ev._id} style={{
                  padding: "7px 12px", background: "#ef444418", border: "1px solid #ef444433",
                  borderRadius: 8, color: "#ef4444", cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 12,
                }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  );
}