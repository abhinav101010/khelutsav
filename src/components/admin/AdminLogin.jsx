import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 600)); // slight delay for feel
    const ok = login(username, password);
    if (ok) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0f1117",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Nunito', sans-serif", padding: "1.5rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background blobs */}
      {[
        { w: 400, h: 400, top: -100, left: -100, color: "#ff6b3d" },
        { w: 300, h: 300, bottom: -80, right: -80, color: "#ffb347" },
      ].map((b, i) => (
        <div key={i} style={{
          position: "absolute", width: b.w, height: b.h, borderRadius: "50%",
          top: b.top, bottom: b.bottom, left: b.left, right: b.right,
          background: `radial-gradient(circle, ${b.color}18, transparent 70%)`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Floating sport emojis */}
      {["🏆","⚽","🏀","🏃","🎯"].map((e, i) => (
        <div key={i} style={{
          position: "absolute", fontSize: "2rem", opacity: 0.06,
          top: `${10 + i * 18}%`,
          left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
          right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
          animation: `floatY ${3 + i * 0.4}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
          pointerEvents: "none",
        }}>{e}</div>
      ))}

      <div style={{
        width: "100%", maxWidth: 420, position: "relative",
        animation: shake ? "shakeX 0.5s ease" : "fadeUp 0.5s ease both",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, #ff6b3d, #ffb347)",
            borderRadius: 16, padding: "10px 20px", marginBottom: 16,
          }}>
            <span style={{ fontSize: "1.4rem" }}>🛡️</span>
            <span style={{ fontFamily: "'Black Ops One', cursive", fontSize: "1rem", color: "#fff", letterSpacing: 1 }}>
              ADMIN PANEL
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: "2.2rem", color: "#fff", letterSpacing: "-0.5px", lineHeight: 1,
          }}>
            SPORTS<span style={{ color: "#ff6b3d" }}>DAY</span>
            <span style={{ color: "#ffb347" }}>26</span>
          </h1>
          <p style={{ color: "#6b7280", fontWeight: 600, marginTop: 8, fontSize: 14 }}>
            Sign in to manage the event
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#1a1d2e",
          borderRadius: 24, padding: "2.5rem",
          border: "1px solid #2a2d42",
          boxShadow: "0 24px 60px #00000055",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#6b7280", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Username
              </label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                style={{
                  width: "100%", background: "#0f1117", border: "1px solid #2a2d42",
                  borderRadius: 12, padding: "13px 16px", fontSize: 14,
                  color: "#fff", outline: "none", fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700, boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "#ff6b3d"}
                onBlur={e => e.target.style.borderColor = "#2a2d42"}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#6b7280", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%", background: "#0f1117", border: "1px solid #2a2d42",
                  borderRadius: 12, padding: "13px 16px", fontSize: 14,
                  color: "#fff", outline: "none", fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700, boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "#ff6b3d"}
                onBlur={e => e.target.style.borderColor = "#2a2d42"}
              />
            </div>

            {error && (
              <div style={{
                background: "#ff6b3d18", border: "1px solid #ff6b3d44",
                borderRadius: 10, padding: "10px 14px",
                color: "#ff6b3d", fontSize: 13, fontWeight: 700,
              }}>⚠️ {error}</div>
            )}

            <button type="submit" disabled={loading} style={{
              marginTop: 8, padding: "14px",
              background: loading ? "#2a2d42" : "linear-gradient(135deg, #ff6b3d, #ffb347)",
              border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Righteous', cursive", fontSize: 15, color: "#fff",
              letterSpacing: 1, transition: "all 0.2s",
              boxShadow: loading ? "none" : "0 6px 20px #ff6b3d44",
            }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div style={{ marginTop: 20, padding: "12px 16px", background: "#0f1117", borderRadius: 10, border: "1px solid #2a2d42" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Demo Credentials</div>
            <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>Username: <span style={{ color: "#ff6b3d" }}>admin</span></div>
            <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>Password: <span style={{ color: "#ff6b3d" }}>sportsday2026</span></div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Black+Ops+One&family=Righteous&display=swap');
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shakeX { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
      `}</style>
    </div>
  );
}