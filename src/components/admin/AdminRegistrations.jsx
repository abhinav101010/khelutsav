import { useState, useEffect } from "react";
import API_BASE from "../../config";

const A = { bg: "#0f1117", surface: "#1a1d2e", border: "#2a2d42", text: "#e8eaf5", text2: "#6b7280", accent: "#ff6b3d", accent2: "#ffb347", green: "#22c55e", red: "#ef4444" };

const STATUS_COLORS = {
  Confirmed: { bg: "#22c55e18", color: "#22c55e", border: "#22c55e33" },
  Pending:   { bg: "#f59e0b18", color: "#f59e0b", border: "#f59e0b33" },
  Cancelled: { bg: "#ef444418", color: "#ef4444", border: "#ef444433" },
};

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/registrations`)
      .then(r => r.json())
      .then(d => { setRegistrations(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (mongoId, status) => {
    setUpdating(mongoId);
    await fetch(`${API_BASE}/api/registrations/${mongoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setRegistrations(prev => prev.map(r => r._id === mongoId ? { ...r, status } : r));
    setUpdating(null);
  };

  const deleteReg = async (mongoId) => {
    if (!window.confirm("Delete this registration?")) return;
    setDeleting(mongoId);
    await fetch(`${API_BASE}/api/registrations/${mongoId}`, { method: "DELETE" });
    setRegistrations(prev => prev.filter(r => r._id !== mongoId));
    setDeleting(null);
  };

  const filtered = registrations.filter(r => {
    const matchSearch = r.name?.toLowerCase().includes(search.toLowerCase()) ||
                        r.roll?.toLowerCase().includes(search.toLowerCase()) ||
                        r.id?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.8rem", color: A.text }}>Registrations</h1>
          <p style={{ color: A.text2, fontWeight: 600, marginTop: 4 }}>{registrations.length} total · {registrations.filter(r => r.status === "Confirmed").length} confirmed</p>
        </div>
        <button onClick={fetchData} style={{
          background: A.surface, border: `1px solid ${A.border}`, borderRadius: 10,
          padding: "9px 18px", color: A.text2, cursor: "pointer",
          fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13,
        }}>↻ Refresh</button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          placeholder="Search name, roll, ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, background: A.surface, border: `1px solid ${A.border}`,
            borderRadius: 10, padding: "10px 14px", color: A.text,
            fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, outline: "none",
          }}
        />
        {["All", "Confirmed", "Pending", "Cancelled"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{
            padding: "9px 16px", borderRadius: 10, border: `1px solid ${filterStatus === s ? A.accent : A.border}`,
            background: filterStatus === s ? `${A.accent}22` : A.surface,
            color: filterStatus === s ? A.accent : A.text2,
            fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 12, cursor: "pointer",
          }}>{s}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={{ background: A.surface, borderRadius: 14, height: 70, animation: "pulse 1.4s infinite", border: `1px solid ${A.border}` }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: A.text2, fontWeight: 700 }}>No registrations found</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(r => {
            const sc = STATUS_COLORS[r.status] || STATUS_COLORS.Pending;
            return (
              <div key={r._id} style={{
                background: A.surface, borderRadius: 16, padding: "1rem 1.2rem",
                border: `1px solid ${A.border}`, display: "flex", alignItems: "center",
                gap: 16, flexWrap: "wrap",
              }}>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: A.text }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: A.text2, fontWeight: 600, marginTop: 3 }}>
                    {r.roll} · {r.year} · {r.dept}
                  </div>
                  <div style={{ fontSize: 11, color: A.accent, fontWeight: 700, marginTop: 3, fontFamily: "monospace" }}>{r.id}</div>
                </div>

                {/* Events */}
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {r.events?.map(ev => (
                      <span key={ev} style={{
                        fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 999,
                        background: `${A.accent}18`, color: A.accent, border: `1px solid ${A.accent}33`,
                      }}>{ev}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: A.text2, marginTop: 4 }}>👕 {r.size} · 📞 {r.phone || "—"}</div>
                </div>

                {/* Status badge */}
                <span style={{
                  fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999,
                  background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                  whiteSpace: "nowrap",
                }}>{r.status}</span>

                {/* Actions */}
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {r.status !== "Confirmed" && (
                    <button onClick={() => updateStatus(r._id, "Confirmed")} disabled={updating === r._id} style={{
                      padding: "6px 12px", borderRadius: 8, border: "1px solid #22c55e33",
                      background: "#22c55e18", color: "#22c55e", cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 11,
                    }}>✓ Confirm</button>
                  )}
                  {r.status !== "Cancelled" && (
                    <button onClick={() => updateStatus(r._id, "Cancelled")} disabled={updating === r._id} style={{
                      padding: "6px 12px", borderRadius: 8, border: "1px solid #f59e0b33",
                      background: "#f59e0b18", color: "#f59e0b", cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 11,
                    }}>✕ Cancel</button>
                  )}
                  <button onClick={() => deleteReg(r._id)} disabled={deleting === r._id} style={{
                    padding: "6px 12px", borderRadius: 8, border: "1px solid #ef444433",
                    background: "#ef444418", color: "#ef4444", cursor: "pointer",
                    fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 11,
                  }}>🗑</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  );
}