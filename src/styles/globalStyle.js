export const makeGlobalStyle = (T, isDark) => `
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