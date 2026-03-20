const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Black+Ops+One&family=Righteous&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #e8eaf0; font-family: 'Nunito', sans-serif; color: #2c2e3e; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #dfe1e8; }
  ::-webkit-scrollbar-thumb { background: #b0b3c8; border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.04); }
  }
  @keyframes scroll-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }

  .fade-up   { animation: fadeUp 0.6s ease both; }
  .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
  .fade-up-4 { animation: fadeUp 0.6s 0.4s ease both; }
  .float     { animation: floatY 3s ease-in-out infinite; }

  .sponsor-track { display: flex; gap: 2rem; animation: scroll-left 18s linear infinite; width: max-content; }
  .sponsor-track:hover { animation-play-state: paused; }

  /* ── Reusable neu components ── */
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
  .neu-btn:hover  { box-shadow: 3px 3px 8px #c5c7cf, -3px -3px 8px #ffffff; transform: translateY(-1px); }
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
  .neu-input:focus {
    box-shadow: inset 6px 6px 16px #c0c2ca, inset -4px -4px 10px #ffffff,
                0 0 0 2.5px #ff6b3d44;
  }

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

export default globalStyle;
