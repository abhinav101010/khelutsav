import { useTheme } from "../../context/ThemeContext";
import useFetch from "../../hooks/useFetch";
import API_BASE from "../../config";

const A = { bg: "#0f1117", surface: "#1a1d2e", border: "#2a2d42", text: "#e8eaf5", text2: "#6b7280", accent: "#ff6b3d", accent2: "#ffb347", green: "#22c55e", blue: "#3b82f6" };

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div style={{
      background: A.surface, borderRadius: 20, padding: "1.5rem",
      border: `1px solid ${A.border}`, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `${color}18` }} />
      <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: "2rem", fontFamily: "'Black Ops One', cursive", color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: A.text2, fontWeight: 700, marginTop: 6 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: A.green, fontWeight: 700, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const { data: registrations, loading: rLoading } = useFetch(`${API_BASE}/api/registrations`);
  const { data: events, loading: eLoading } = useFetch(`${API_BASE}/api/games`);
  const { data: sponsors, loading: sLoading } = useFetch(`${API_BASE}/api/sponsors`);

  const confirmed = registrations?.filter(r => r.status === "Confirmed").length || 0;
  const pending   = registrations?.filter(r => r.status === "Pending").length || 0;
  const openEvents = events?.filter(e => e.status === "Open").length || 0;
  const activeSponsors = sponsors?.filter(s => s.status === "Active").length || 0;

  // Department breakdown
  const deptMap = {};
  registrations?.forEach(r => { if (r.dept) deptMap[r.dept] = (deptMap[r.dept] || 0) + 1; });
  const deptEntries = Object.entries(deptMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Event popularity
  const evMap = {};
  registrations?.forEach(r => r.events?.forEach(e => { evMap[e] = (evMap[e] || 0) + 1; }));
  const evEntries = Object.entries(evMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1.8rem", color: A.text }}>Dashboard</h1>
        <p style={{ color: A.text2, fontWeight: 600, marginTop: 4 }}>Sports Day 2026 — Live Overview</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: "2rem" }}>
        <StatCard icon="📋" label="Total Registrations" value={rLoading ? "..." : registrations?.length || 0} color={A.accent} sub={`${confirmed} confirmed`} />
        <StatCard icon="⏳" label="Pending"             value={rLoading ? "..." : pending}                   color="#f59e0b" />
        <StatCard icon="🏅" label="Open Events"         value={eLoading ? "..." : openEvents}                color={A.blue} sub={`of ${events?.length || 0} total`} />
        <StatCard icon="💰" label="Active Sponsors"     value={sLoading ? "..." : activeSponsors}            color={A.green} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Department breakdown */}
        <div style={{ background: A.surface, borderRadius: 20, padding: "1.5rem", border: `1px solid ${A.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: A.text2, textTransform: "uppercase", marginBottom: 16 }}>By Department</div>
          {deptEntries.length === 0 ? (
            <div style={{ color: A.text2, fontSize: 13 }}>No data yet</div>
          ) : deptEntries.map(([dept, count]) => (
            <div key={dept} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: A.text }}>{dept}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: A.accent }}>{count}</span>
              </div>
              <div style={{ height: 6, background: A.bg, borderRadius: 999 }}>
                <div style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${A.accent}, ${A.accent2})`, width: `${(count / (registrations?.length || 1)) * 100}%`, transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top events */}
        <div style={{ background: A.surface, borderRadius: 20, padding: "1.5rem", border: `1px solid ${A.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: A.text2, textTransform: "uppercase", marginBottom: 16 }}>Most Popular Events</div>
          {evEntries.length === 0 ? (
            <div style={{ color: A.text2, fontSize: 13 }}>No data yet</div>
          ) : evEntries.map(([ev, count], i) => (
            <div key={ev} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: i === 0 ? "linear-gradient(135deg, #ff6b3d, #ffb347)" : A.bg,
                fontSize: 11, fontWeight: 900, color: i === 0 ? "#fff" : A.text2, flexShrink: 0,
              }}>{i + 1}</div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: A.text }}>{ev}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: A.accent }}>{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}