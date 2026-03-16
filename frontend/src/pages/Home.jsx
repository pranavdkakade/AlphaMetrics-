import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ────────────────────────────────────────────────
   THEME TOKENS
   LIGHT = current clean blue-white palette
   DARK  = deep space / black-navy palette
──────────────────────────────────────────────── */
const LIGHT = {
  pageBg:           "linear-gradient(135deg,#e8f0fe 0%,#dbeafe 50%,#e0f2fe 100%)",
  headerBg:         "#ffffff",
  headerBorder:     "#e5e7eb",
  headerShadow:     "0 2px 8px rgba(0,0,0,0.06)",
  navText:          "#374151",
  navHover:         "#16a34a",
  loginBtn:         "#14b24e",
  loginBtnHover:    "#149644",
  heroCardBg:       "#ffffff",
  heroInnerBg:      "#f9fafb",
  heroCardShadow:   "0 20px 60px rgba(0,0,0,0.12)",
  heroMetricLabel:  "#9ca3af",
  heroMetricValue:  "#1f2937",
  heroAiBanner:     "#1a2e5a",
  badgeBg:          "#cffafe",
  badgeText:        "#0e7490",
  badgeDot:         "#0891b2",
  h1:               "#1a2e5a",
  h2:               "#1a2e5a",
  h2Alt:            "#111827",
  bodyText:         "#4b5563",
  mutedText:        "#6b7280",
  xAxisLabel:       "#9ca3af",
  brandsBg:         "rgba(255,255,255,0.45)",
  brandText:        "#9ca3af",
  capSectionBg:     "#ffffff",
  featCardBg:       "#ffffff",
  featCardBorder:   "#f3f4f6",
  featCardHead:     "#111827",
  featCardBody:     "#6b7280",
  processSectionBg: "linear-gradient(135deg,#f0f4ff 0%,#e8f0fe 100%)",
  processCircleBg:  "white",
  processCircleShadow: "0 4px 20px rgba(99,102,241,0.15)",
  processNumBg:     "#1a2e5a",
  processIcon:      "#1a2e5a",
  processTitle:     "#1a2e5a",
  processDesc:      "#6b7280",
  processDash:      "#c7d2fe",
  dashSectionBg:    "#ffffff",
  dashSectionHead:  "#1a2e5a",
  dashCardBg:       "#f8faff",
  dashCardShadow:   "0 8px 40px rgba(99,102,241,0.10)",
  dashInnerBg:      "#ffffff",
  dashInnerShadow:  "0 2px 12px rgba(0,0,0,0.05)",
  dashLabel:        "#9ca3af",
  dashValue:        "#1a2e5a",
  dashTopName:      "#4b5563",
  dashTopValue:     "#1f2937",
  dashBarTrack:     "#f3f4f6",
  donutTrack:       "#e5e7eb",
  invProduct:       "#374151",
  invSku:           "#9ca3af",
  invStock:         "#4b5563",
  invBarTrack:      "#f3f4f6",
  invRowHover:      "#f0f7ff",
  invRowText:       "#1a2e5a",
  invHeadBorder:    "#f3f4f6",
  tableHeadText:    "#9ca3af",
  builtBg:          "linear-gradient(135deg,#0f1e45 0%,#1a3a6b 50%,#0d3352 100%)",
  footerBg:         "#f8fafc",
  footerBorder:     "#e2e8f0",
  footerBody:       "#64748b",
  footerHead:       "#0f172a",
  footerLink:       "#475569",
  footerBottom:     "#94a3b8",
  footerBottomBorder: "#e2e8f0",
};

const DARK = {
  pageBg:           "linear-gradient(135deg,#04060d 0%,#060a14 50%,#050810 100%)",
  headerBg:         "#070c18",
  headerBorder:     "#111d35",
  headerShadow:     "0 2px 16px rgba(0,0,0,0.7)",
  navText:          "#6b7d95",
  navHover:         "#10b981",
  loginBtn:         "#10b981",
  loginBtnHover:    "#059669",
  heroCardBg:       "#0c1326",
  heroInnerBg:      "#101929",
  heroCardShadow:   "0 20px 60px rgba(0,0,0,0.7)",
  heroMetricLabel:  "#374c65",
  heroMetricValue:  "#dde4f0",
  heroAiBanner:     "#080f1e",
  badgeBg:          "#061d2b",
  badgeText:        "#22d3ee",
  badgeDot:         "#06b6d4",
  h1:               "#dde4f0",
  h2:               "#b8c8e0",
  h2Alt:            "#b8c8e0",
  bodyText:         "#7a8ba0",
  mutedText:        "#4e6070",
  xAxisLabel:       "#374c65",
  brandsBg:         "rgba(4,6,13,0.97)",
  brandText:        "#1e2d3f",
  capSectionBg:     "#060a14",
  featCardBg:       "#0c1326",
  featCardBorder:   "#111d35",
  featCardHead:     "#dde4f0",
  featCardBody:     "#4e6070",
  processSectionBg: "linear-gradient(135deg,#040710 0%,#05091a 100%)",
  processCircleBg:  "#0c1326",
  processCircleShadow: "0 4px 20px rgba(16,185,129,0.2)",
  processNumBg:     "#10b981",
  processIcon:      "#10b981",
  processTitle:     "#b8c8e0",
  processDesc:      "#4e6070",
  processDash:      "#111d35",
  dashSectionBg:    "#060a14",
  dashSectionHead:  "#b8c8e0",
  dashCardBg:       "#080e1c",
  dashCardShadow:   "0 8px 40px rgba(0,0,0,0.6)",
  dashInnerBg:      "#0c1326",
  dashInnerShadow:  "0 2px 12px rgba(0,0,0,0.5)",
  dashLabel:        "#374c65",
  dashValue:        "#b8c8e0",
  dashTopName:      "#7a8ba0",
  dashTopValue:     "#dde4f0",
  dashBarTrack:     "#111d35",
  donutTrack:       "#111d35",
  invProduct:       "#7a8ba0",
  invSku:           "#2a3c50",
  invStock:         "#4e6070",
  invBarTrack:      "#111d35",
  invRowHover:      "#0f1929",
  invRowText:       "#b8c8e0",
  invHeadBorder:    "#111d35",
  tableHeadText:    "#2a3c50",
  builtBg:          "linear-gradient(135deg,#020406 0%,#060c16 50%,#03070e 100%)",
  footerBg:         "#060a14",
  footerBorder:     "#111d35",
  footerBody:       "#374c65",
  footerHead:       "#b8c8e0",
  footerLink:       "#2a3c50",
  footerBottom:     "#2a3c50",
  footerBottomBorder: "#111d35",
};

export default function Home() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);

  const handleLoginFormChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const submitLoginModal = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please fill in all fields.");
      return;
    }
    setLoginError("");
    setShowLoginModal(false);
    navigate("/dashboard");
  };
  const openLogin = () => { setLoginForm({ email: "", password: "" }); setLoginError(""); setShowLoginModal(true); setShowRegisterModal(false); };

  // ── Register modal state ──
  const OCCUPATIONS = ["Retail Store Owner","Retail Manager","Inventory Analyst","Sales Executive","Supply Chain Manager","Business Analyst","Entrepreneur","Other"];
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regForm, setRegForm] = useState({ name: "", occupation: "", email: "", password: "", confirmPassword: "" });
  const [regErrors, setRegErrors] = useState({});
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

  const handleRegFormChange = (e) => setRegForm({ ...regForm, [e.target.name]: e.target.value });
  const validateReg = () => {
    const e = {};
    if (!regForm.name.trim()) e.name = "Full name is required.";
    if (!regForm.occupation) e.occupation = "Please select an occupation.";
    if (!regForm.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) e.email = "Enter a valid email.";
    if (!regForm.password) e.password = "Password is required.";
    else if (regForm.password.length < 6) e.password = "Password must be at least 6 characters.";
    if (!regForm.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (regForm.password !== regForm.confirmPassword) e.confirmPassword = "Passwords do not match.";
    return e;
  };
  const submitRegModal = (e) => {
    e.preventDefault();
    const errs = validateReg();
    if (Object.keys(errs).length > 0) { setRegErrors(errs); return; }
    setRegErrors({});
    setRegSubmitted(true);
    setTimeout(() => { setShowRegisterModal(false); setRegSubmitted(false); setRegForm({ name: "", occupation: "", email: "", password: "", confirmPassword: "" }); openLogin(); }, 1800);
  };
  const openRegister = () => { setRegForm({ name: "", occupation: "", email: "", password: "", confirmPassword: "" }); setRegErrors({}); setRegSubmitted(false); setShowRegisterModal(true); setShowLoginModal(false); };
  const regFieldStyle = (hasErr) => ({ border: `1.5px solid ${hasErr ? "#ef4444" : "#d1d5db"}`, color: "#111827" });

  const [donutKey, setDonutKey] = useState(0);
  const [donutCount, setDonutCount] = useState(0);
  const [chartKey, setChartKey] = useState(0);
  const [revenueCount, setRevenueCount] = useState(0);
  const [pctCount, setPctCount] = useState(0);

  const t = dark ? DARK : LIGHT;

  // Donut counter: 0 → 68
  useEffect(() => {
    let start = 0;
    const target = 68;
    const duration = 1200;
    const stepTime = Math.floor(duration / target);
    setDonutCount(0);
    const timer = setInterval(() => {
      start += 1;
      setDonutCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [donutKey]);

  // Revenue + % counter on chartKey change
  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;
    const revenueTarget = 128430;
    const pctTarget = 12.5;
    let step = 0;
    setRevenueCount(0);
    setPctCount(0);
    const timer = setInterval(() => {
      step += 1;
      const progress = step / steps;
      setRevenueCount(Math.round(revenueTarget * progress));
      setPctCount(parseFloat((pctTarget * progress).toFixed(1)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [chartKey]);

  return (
    <div className="min-h-screen" style={{ background: t.pageBg, transition: "background 0.4s ease" }}>

      {/* ── Header ── */}
      <header
        className="w-full sticky top-0 z-50"
        style={{
          background: t.headerBg,
          borderBottom: `1px solid ${t.headerBorder}`,
          boxShadow: t.headerShadow,
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Top bar */}
        <div className="px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              src="/webname.png"
              alt="AlphaMetrics"
              className="h-6 w-auto object-contain"
              style={{ filter: dark ? "invert(1)" : "none", transition: "filter 0.4s ease" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="font-medium cursor-pointer"
              style={{ fontFamily: "'Inter',sans-serif", color: t.navText, fontSize: "0.9rem", letterSpacing: "0.01em", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = t.navHover}
              onMouseLeave={e => e.currentTarget.style.color = t.navText}
            >Home</a>
            <a
              href="#capabilities"
              onClick={e => { e.preventDefault(); document.getElementById("capabilities").scrollIntoView({ behavior: "smooth" }); }}
              className="font-medium cursor-pointer"
              style={{ fontFamily: "'Inter',sans-serif", color: t.navText, fontSize: "0.9rem", letterSpacing: "0.01em", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = t.navHover}
              onMouseLeave={e => e.currentTarget.style.color = t.navText}
            >Capabilities</a>
            <a
              href="#the-process"
              onClick={e => { e.preventDefault(); document.getElementById("the-process").scrollIntoView({ behavior: "smooth" }); }}
              className="font-medium cursor-pointer"
              style={{ fontFamily: "'Inter',sans-serif", color: t.navText, fontSize: "0.9rem", letterSpacing: "0.01em", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = t.navHover}
              onMouseLeave={e => e.currentTarget.style.color = t.navText}
            >The Process</a>
            <Link
              to="/dashboard"
              className="font-medium cursor-pointer"
              style={{ fontFamily: "'Inter',sans-serif", color: t.navText, fontSize: "0.9rem", letterSpacing: "0.01em", transition: "color 0.2s", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = t.navHover}
              onMouseLeave={e => e.currentTarget.style.color = t.navText}
            >Dashboard</Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setDark(d => !d)}
              title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{ width: "46px", height: "26px", borderRadius: "13px", border: "none", padding: 0, cursor: "pointer", position: "relative", background: dark ? "#10b981" : "#d1d5db", transition: "background 0.35s ease", flexShrink: 0, outline: "none" }}
              aria-label="Toggle theme"
            >
              <span style={{ position: "absolute", top: "4px", left: dark ? "22px" : "4px", width: "18px", height: "18px", borderRadius: "50%", background: "#ffffff", transition: "left 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.25)", lineHeight: 1 }}>
                {dark ? "🌙" : "☀️"}
              </span>
            </button>

            <button
              onClick={openLogin}
              className="text-white px-5 py-2 rounded-lg font-semibold"
              style={{ fontFamily: "'Inter',sans-serif", background: t.loginBtn, fontSize: "0.9rem", letterSpacing: "0.02em", transition: "background 0.2s", border: "none", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = t.loginBtnHover}
              onMouseLeave={e => e.currentTarget.style.background = t.loginBtn}
            >Login</button>
          </nav>

          {/* Mobile right side: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle (mobile) */}
            <button
              onClick={() => setDark(d => !d)}
              style={{ width: "40px", height: "22px", borderRadius: "11px", border: "none", padding: 0, cursor: "pointer", position: "relative", background: dark ? "#10b981" : "#d1d5db", transition: "background 0.35s ease", flexShrink: 0, outline: "none" }}
              aria-label="Toggle theme"
            >
              <span style={{ position: "absolute", top: "3px", left: dark ? "19px" : "3px", width: "16px", height: "16px", borderRadius: "50%", background: "#ffffff", transition: "left 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", lineHeight: 1 }}>
                {dark ? "🌙" : "☀️"}
              </span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px", outline: "none" }}
            >
              <span style={{ display: "block", width: "22px", height: "2px", borderRadius: "2px", background: t.navText, transition: "transform 0.3s ease, opacity 0.3s ease", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ display: "block", width: "22px", height: "2px", borderRadius: "2px", background: t.navText, transition: "opacity 0.3s ease", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "2px", borderRadius: "2px", background: t.navText, transition: "transform 0.3s ease, opacity 0.3s ease", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className="md:hidden overflow-hidden"
          style={{
            maxHeight: menuOpen ? "320px" : "0px",
            transition: "max-height 0.35s ease",
            borderTop: menuOpen ? `1px solid ${t.headerBorder}` : "none",
          }}
        >
          <div className="flex flex-col px-6 py-4 gap-1">
            {[
              { label: "Home",         onClick: () => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); } },
              { label: "Capabilities", onClick: () => { document.getElementById("capabilities").scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); } },
              { label: "The Process",  onClick: () => { document.getElementById("the-process").scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); } },
              { label: "Dashboard",    onClick: () => { navigate("/dashboard"); setMenuOpen(false); } },
            ].map(item => (
              <button
                key={item.label}
                onClick={item.onClick}
                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "10px 0", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "0.95rem", color: t.navText, borderBottom: `1px solid ${t.headerBorder}`, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = t.navHover}
                onMouseLeave={e => e.currentTarget.style.color = t.navText}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); openLogin(); }}
              className="text-white text-center rounded-lg font-semibold mt-3 py-2.5"
              style={{ background: t.loginBtn, fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", letterSpacing: "0.02em", transition: "background 0.2s", border: "none", cursor: "pointer", width: "100%" }}
            >Login</button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <main className="max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full w-fit"
            style={{ background: t.badgeBg, color: t.badgeText }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: t.badgeDot, display: "inline-block", flexShrink: 0 }} />
            <span>AI-Powered Retail Intelligence</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-tight" style={{ color: t.h1 }}>
            AlphaMetrics:<br />
            Where Data<br />
            Becomes{" "}
            <span style={{ color: "#10b981" }}>Profit</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg leading-relaxed max-w-md" style={{ color: t.bodyText }}>
            Harness the power of AI to transform your retail data into
            actionable insights, automated supply chains, and increased
            profitability.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={openLogin}
              className="px-6 py-3 rounded-lg font-semibold text-white text-base transition-all hover:opacity-90"
              style={{ background: "#10b981", border: "none", cursor: "pointer" }}
            >Get Started Free</button>
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-lg font-semibold text-base border-2 transition-all"
              style={{
                background: dark ? "#0c1326" : "#ffffff",
                color: dark ? "#7a8ba0" : "#374151",
                borderColor: dark ? "#111d35" : "#cbd5e1",
              }}
            >View Live Dashboard</Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex -space-x-2">
              {["/p1.png", "/p2.png", "/p3.png"].map((src, i) => (
                <img
                  key={i} src={src} alt={`user-${i + 1}`}
                  className="w-8 h-8 rounded-full border-2 object-cover"
                  style={{ borderColor: dark ? "#0c1326" : "#ffffff", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}
                />
              ))}
            </div>
            <p className="text-sm" style={{ color: t.mutedText }}>
              Join <span className="font-bold" style={{ color: dark ? "#b8c8e0" : "#374151" }}>2,000+</span> retail managers worldwide
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN — Dashboard Card */}
        <div className="flex-1 flex justify-center">
          <div
            className="rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 relative"
            style={{ background: t.heroCardBg, boxShadow: t.heroCardShadow }}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: t.heroMetricLabel }}>Performance Overview</p>
                <h2 className="text-xl font-bold mt-1" style={{ color: t.heroMetricValue }}>Monthly Revenue</h2>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm" style={{ background: "#e0fdf4", color: "#10b981" }}>↗</div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={{ background: t.heroInnerBg }}>
                <p className="text-xs uppercase tracking-wide" style={{ color: t.heroMetricLabel }}>Total Profit</p>
                <p className="text-2xl font-bold mt-1" style={{ color: t.heroMetricValue }}>$42,500</p>
                <p className="text-xs mt-1" style={{ color: "#10b981" }}>+8.5% vs last month</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: t.heroInnerBg }}>
                <p className="text-xs uppercase tracking-wide" style={{ color: t.heroMetricLabel }}>Active Customers</p>
                <p className="text-2xl font-bold mt-1" style={{ color: t.heroMetricValue }}>12,843</p>
                <p className="text-xs mt-1" style={{ color: "#10b981" }}>+12.2% new growth</p>
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-36">
              <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path d="M0,100 C30,95 60,85 90,75 C120,65 140,80 170,70 C200,60 230,30 270,20 C310,10 350,18 400,15 L400,120 L0,120 Z" fill="url(#chartGrad)" />
                <path d="M0,100 C30,95 60,85 90,75 C120,65 140,80 170,70 C200,60 230,30 270,20 C310,10 350,18 400,15" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                {["JAN", "FEB", "MAR"].map(m => (
                  <span key={m} className="text-xs" style={{ color: t.xAxisLabel }}>{m}</span>
                ))}
              </div>
            </div>

            {/* AI Recommendation Banner */}
            <div className="flex items-center gap-3 rounded-xl px-4 py-3 mt-1" style={{ background: t.heroAiBanner }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#10b981" }}>
                <span className="text-white text-xs">✦</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#10b981" }}>AI Recommendation</p>
                <p className="text-white text-sm font-medium">Increase stock of Item #402 by 15%</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Brands Marquee ── */}
      <section className="py-20 px-4" style={{ background: t.brandsBg }}>
        <p className="text-center text-xs font-bold tracking-[0.25em] uppercase mb-20" style={{ color: t.brandText }}>
          Powering Leading Retailers
        </p>
        <div className="marquee-wrapper">
          <div className="animate-marquee">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-16 px-8 flex-shrink-0">
                {[
                  { label: "RetailCo",  d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M7 13h10m0 0l1.6 8M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" },
                  { label: "MarketPro", d: "M3 9.5L12 4l9 5.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9" },
                  { label: "Logistix",  d: "M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" },
                  { label: "StockFlow", d: "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z M9 7h6M9 11h6M9 15h4" },
                  { label: "NexMart",   d: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { label: "TradeHub",  d: "M12 3a9 9 0 100 18A9 9 0 0012 3z M12 3a15 15 0 010 18M3 12h18" },
                ].map(b => (
                  <div key={b.label} className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm" style={{ color: t.brandText }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={b.d} />
                    </svg>
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features / Capabilities ── */}
      <section id="capabilities" className="py-20 px-8" style={{ background: t.capSectionBg }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-14">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#6366f1" }}>Capabilities</p>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: t.h2Alt }}>
              Powerful Features for Modern Retail
            </h2>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: t.bodyText }}>
              Our AI-driven infrastructure is built to handle the complexities of high-volume retail environments with surgical precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Card 1 — AI Product Recognition */}
            <div
              className="feature-card rounded-xl p-6 flex flex-col gap-4 cursor-default"
              style={{
                background: t.featCardBg,
                border: `1px solid ${t.featCardBorder}`,
                boxShadow: dark ? "0 1px 6px rgba(0,0,0,0.4)" : "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              {/* Icon row */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: dark ? "#12133a" : "#eff0fe" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="#6366f1" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75H6A2.25 2.25 0 003.75 6v3.75M14.25 3.75H18A2.25 2.25 0 0120.25 6v3.75M3.75 14.25V18A2.25 2.25 0 006 20.25h3.75M14.25 20.25H18A2.25 2.25 0 0020.25 18v-3.75" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold" style={{ color: t.featCardHead }}>AI Product Recognition</h3>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: t.featCardBorder }} />

              {/* Body */}
              <p className="text-sm leading-relaxed" style={{ color: t.featCardBody }}>
                Identify and categorize inventory instantly. Our neural networks match products from images with high accuracy — no manual entry needed.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto pt-1">
                {["Vision AI", "Auto-tag", "Real-time"].map(tag => (
                  <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-md"
                    style={{ background: dark ? "#12133a" : "#eff0fe", color: "#6366f1" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2 — Automated Profit Tracking */}
            <div
              className="feature-card rounded-xl p-6 flex flex-col gap-4 cursor-default"
              style={{
                background: t.featCardBg,
                border: `1px solid ${t.featCardBorder}`,
                boxShadow: dark ? "0 1px 6px rgba(0,0,0,0.4)" : "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: dark ? "#042318" : "#e6faf5" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="#10b981" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                    <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
                    <line x1="10" y1="14" x2="14" y2="14" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold" style={{ color: t.featCardHead }}>Automated Profit Tracking</h3>
              </div>

              <div style={{ height: "1px", background: t.featCardBorder }} />

              <p className="text-sm leading-relaxed" style={{ color: t.featCardBody }}>
                Sales logged automatically at every transaction. Monitor margins live and reconcile stock with revenue without lifting a finger.
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-1">
                {["Live margins", "Auto-log", "Zero friction"].map(tag => (
                  <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-md"
                    style={{ background: dark ? "#042318" : "#e6faf5", color: "#10b981" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3 — Advanced Business Analytics */}
            <div
              className="feature-card rounded-xl p-6 flex flex-col gap-4 cursor-default"
              style={{
                background: t.featCardBg,
                border: `1px solid ${t.featCardBorder}`,
                boxShadow: dark ? "0 1px 6px rgba(0,0,0,0.4)" : "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: dark ? "#071428" : "#eff6ff" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="#3b82f6" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6m4 6V9m4 9V6m4 12v-3m4 3V3" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold" style={{ color: t.featCardHead }}>Advanced Business Analytics</h3>
              </div>

              <div style={{ height: "1px", background: t.featCardBorder }} />

              <p className="text-sm leading-relaxed" style={{ color: t.featCardBody }}>
                Deep-dive dashboards with trend forecasting, cohort analysis, and demand prediction — all built on your live sales data.
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-1">
                {["Forecasting", "Cohort view", "Export ready"].map(tag => (
                  <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-md"
                    style={{ background: dark ? "#071428" : "#eff6ff", color: "#3b82f6" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="the-process" className="py-20 px-8" style={{ background: t.processSectionBg }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#6366f1" }}>The Process</p>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: t.h2 }}>How AlphaMetrics Works</h2>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: t.bodyText }}>
              A streamlined workflow designed to integrate seamlessly into your existing retail environment.
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row items-start justify-between gap-10">
            <div
              className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px"
              style={{ borderTop: `2px dashed ${t.processDash}`, zIndex: 0 }}
            />

            {[
              { num: "1", title: "Add Product",       desc: "Simply scan or upload your product inventory to our secure cloud database.",          d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" },
              { num: "2", title: "AI Embedding",      desc: "Our neural engine creates high-dimensional visual signatures for every item.",           d: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" },
              { num: "3", title: "Capture at Sale",   desc: "Cameras automatically detect products at checkout, reducing manual entry errors.",      d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z" },
              { num: "4", title: "Profit & Analytics", desc: "View deep-dive reports on sales performance and net profit in your dashboard.",        d: "M3 17l4-8 4 4 3-5 4 9" },
            ].map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center flex-1 gap-4 process-step"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="relative z-10">
                  <div
                    className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold z-20"
                    style={{ background: t.processNumBg }}
                  >{step.num}</div>
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: t.processCircleBg, boxShadow: t.processCircleShadow }}
                  >
                    <svg className="w-7 h-7" fill="none" stroke={t.processIcon} strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.d} />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base font-bold" style={{ color: t.processTitle }}>{step.title}</h3>
                <p className="text-sm leading-relaxed max-w-[180px]" style={{ color: t.processDesc }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Analytics Dashboard ── */}
      <section className="py-20 px-8" style={{ background: t.dashSectionBg }}>
        <div className="max-w-5xl mx-auto">
          <div className="dash-header flex flex-col items-center text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#10b981" }}>Next-Gen Intelligence</p>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: t.dashSectionHead }}>Powerful Analytics Dashboard</h2>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: t.bodyText }}>
              Real-time visibility into your retail performance with AI-driven forecasting and stock optimization.
            </p>
          </div>

          <div className="dash-card rounded-3xl p-7 flex flex-col gap-6" style={{ background: t.dashCardBg, boxShadow: t.dashCardShadow }}>

            {/* Top row */}
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Revenue Chart */}
              <div
                className="dash-chart dash-inner-card flex-[2] rounded-2xl p-6"
                style={{ background: t.dashInnerBg, boxShadow: t.dashInnerShadow }}
                onMouseEnter={() => setChartKey(k => k + 1)}
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs font-medium" style={{ color: t.dashLabel }}>Monthly Revenue</p>
                    <p className="text-2xl font-extrabold mt-1" style={{ color: t.dashValue }}>
                      ${revenueCount.toLocaleString()}.00
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: dark ? "#062820" : "#e6faf5", color: "#10b981" }}>
                    ↗ {pctCount}%
                  </span>
                </div>
                <div className="relative mt-4 h-40">
                  <svg viewBox="0 0 560 140" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={dark ? "0.35" : "0.18"} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>
                    <path d="M0,110 C30,105 55,70 90,65 C125,60 140,95 175,90 C210,85 230,55 270,40 C310,25 330,80 370,50 C400,28 430,75 470,55 C500,40 530,65 560,55 L560,140 L0,140 Z" fill="url(#revGrad)" />
                    <path
                      d="M0,110 C30,105 55,70 90,65 C125,60 140,95 175,90 C210,85 230,55 270,40 C310,25 330,80 370,50 C400,28 430,75 470,55 C500,40 530,65 560,55"
                      fill="none" stroke={dark ? "#3b82f6" : "#1a3a8f"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="1200"
                      strokeDashoffset={1200 - (revenueCount / 128430) * 1200}
                    />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                    {["JAN","FEB","MAR","APR","MAY","JUN"].map(m => (
                      <span key={m} className="text-xs" style={{ color: t.xAxisLabel }}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Donut */}
              <div
                className="dash-donut dash-inner-card flex-1 rounded-2xl p-6 flex flex-col items-center justify-center gap-3"
                style={{ background: t.dashInnerBg, boxShadow: t.dashInnerShadow }}
                onMouseEnter={() => setDonutKey(k => k + 1)}
              >
                <p className="text-xs font-medium" style={{ color: t.dashLabel }}>Gross Profit Margin</p>
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="46" fill="none" stroke={t.donutTrack} strokeWidth="12" />
                    <circle
                      cx="60" cy="60" r="46" fill="none" stroke="#10b981" strokeWidth="12"
                      strokeDasharray={`${(donutCount / 100) * 289} 289`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold" style={{ color: t.dashValue }}>{donutCount}%</span>
                    <span className="text-xs uppercase tracking-wide" style={{ color: t.dashLabel }}>Optimal</span>
                  </div>
                </div>
                <p className="text-xs" style={{ color: t.dashLabel }}>Target: 68%</p>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Top 5 Products */}
              <div className="dash-products dash-inner-card flex-1 rounded-2xl p-6" style={{ background: t.dashInnerBg, boxShadow: t.dashInnerShadow }}>
                <p className="text-sm font-bold mb-4" style={{ color: t.dashValue }}>Top 5 Products</p>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Wireless Audio", val: "2.4k", pct: 85, color: "#3b82f6" },
                    { name: "Smart Home Kit", val: "1.8k", pct: 65, color: "#6366f1" },
                    { name: "USB-C Hub",      val: "1.2k", pct: 44, color: "#10b981" },
                  ].map(p => (
                    <div key={p.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm" style={{ color: t.dashTopName }}>{p.name}</span>
                        <span className="text-sm font-semibold" style={{ color: t.dashTopValue }}>{p.val}</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ background: t.dashBarTrack }}>
                        <div className="h-2 rounded-full dash-bar" style={{ width: `${p.pct}%`, background: p.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory Status */}
              <div className="dash-inventory dash-inner-card flex-[1.4] rounded-2xl p-6" style={{ background: t.dashInnerBg, boxShadow: t.dashInnerShadow }}>
                <p className="text-sm font-bold mb-4" style={{ color: t.dashValue }}>Inventory Status</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider" style={{ borderBottom: `1px solid ${t.invHeadBorder}`, color: t.tableHeadText }}>
                      <th className="text-left pb-2 font-semibold">Product</th>
                      <th className="text-left pb-2 font-semibold">SKU</th>
                      <th className="text-left pb-2 font-semibold">Stock</th>
                      <th className="text-left pb-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Wireless Mouse",      sku: "WM-01", stock: 85, pct: 85, color: "#10b981", status: "IN STOCK",     sBg: dark ? "#062820" : "#e6faf5", sTxt: "#10b981" },
                      { name: "Mechanical Keyboard", sku: "MK-22", stock: 12, pct: 20, color: "#f59e0b", status: "LOW STOCK",    sBg: dark ? "#1c1200" : "#fef3c7", sTxt: "#d97706" },
                      { name: "Gaming Monitor",      sku: "GM-55", stock: 0,  pct: 0,  color: "#374c65", status: "OUT OF STOCK", sBg: dark ? "#200808" : "#fee2e2", sTxt: "#ef4444" },
                    ].map(row => (
                      <tr
                        key={row.sku}
                        className="dash-row"
                        style={{ borderBottom: `1px solid ${t.invHeadBorder}` }}
                        onMouseEnter={e => e.currentTarget.style.background = t.invRowHover}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td className="py-3 font-medium" style={{ color: t.invProduct }}>{row.name}</td>
                        <td className="py-3" style={{ color: t.invSku }}>{row.sku}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full" style={{ background: t.invBarTrack }}>
                              <div className="h-1.5 rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                            </div>
                            <span className="text-xs" style={{ color: t.invStock }}>{row.stock}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ background: row.sBg, color: row.sTxt }}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Built for Data-Driven Retailers ── */}
      <section className="py-20 px-8" style={{ background: t.builtBg }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col gap-7">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Built for Data-Driven<br />Retailers
            </h2>
            <p className="text-blue-200 text-base leading-relaxed max-w-md">
              AlphaMetrics combines advanced machine learning with intuitive design to give you a competitive edge in modern retail management.
            </p>
            <ul className="flex flex-col gap-5">
              {[
                { title: "AI-powered product identification",  desc: "Automatic categorization and visual search integration for seamless inventory logging." },
                { title: "Scalable business analytics",        desc: "From single store to global chain, our platform grows with your data needs." },
                { title: "Real-time demand forecasting",       desc: "Anticipate trends before they happen with historical data pattern analysis." },
                { title: "Multi-channel integration",         desc: "Sync your physical stores with your e-commerce platforms effortlessly." },
                { title: "Predictive inventory restocking",   desc: "Smart alerts that prevent stockouts and reduce overstock waste." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#10b981" }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-blue-300 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 flex-wrap mt-2">
              <button onClick={openLogin} className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90" style={{ background: "#10b981", border: "none", cursor: "pointer" }}>
                Start Optimizing Today
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center relative">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.4)", background: "linear-gradient(160deg,#1a3a6b 0%,#0d3352 100%)" }}
            >
              <img
                src="/webimage.jpg" alt="AI Retail"
                className="w-full max-w-sm object-cover rounded-2xl"
                style={{ display: "block" }}
                onError={e => { e.target.style.display = "none"; }}
              />
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20" style={{ background: "radial-gradient(circle,#10b981,transparent)" }} />
            </div>
            <div
              className="absolute bottom-4 right-4 lg:-right-6 rounded-xl px-5 py-4 flex flex-col items-center"
              style={{ background: "#10b981", boxShadow: "0 8px 24px rgba(16,185,129,0.4)" }}
            >
              <span className="text-white text-2xl font-extrabold leading-none">99.9%</span>
              <span className="text-white text-xs font-bold uppercase tracking-widest mt-1">Data Accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: t.footerBg, fontFamily: "'Inter',sans-serif", transition: "background 0.4s ease" }}>
        <div className="max-w-7xl mx-auto px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

            {/* Brand col — spans 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <img
                src="/webname.png"
                alt="AlphaMetrics"
                className="h-8 object-contain self-start"
                style={{ filter: dark ? "invert(1)" : "none", transition: "filter 0.4s ease" }}
              />
              <span style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"rgba(22,163,74,0.10)", color:"#16a34a", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.09em", padding:"0.28rem 0.75rem", borderRadius:"999px", border:"1px solid rgba(22,163,74,0.25)", width:"fit-content" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#16a34a", display:"inline-block", boxShadow:"0 0 5px #16a34a" }} />
                AI-POWERED PLATFORM
              </span>
              <p style={{ color: t.footerBody, fontSize: "0.83rem", lineHeight: "1.85", maxWidth: "340px" }}>
                AI-Powered Retail Intelligence Platform designed to help small retailers track inventory, analyze sales performance, and make data-driven decisions using computer vision and analytics.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { label:"Twitter", filled:true, icon:<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                  { label:"Instagram", filled:false, icon:<><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></> },
                  { label:"Facebook", filled:true, icon:<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/> },
                ].map(({ label, filled, icon }) => (
                  <a key={label} href="#" aria-label={label}
                    style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"36px", height:"36px", borderRadius:"10px", border:`1px solid ${t.footerBorder}`, color:t.footerLink, background:"transparent", transition:"all 0.2s", cursor:"pointer", textDecoration:"none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="#16a34a"; e.currentTarget.style.color="#16a34a"; e.currentTarget.style.background="rgba(22,163,74,0.09)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=t.footerBorder; e.currentTarget.style.color=t.footerLink; e.currentTarget.style.background="transparent"; }}
                  >
                    <svg style={{ width:"16px", height:"16px" }} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="1.8" viewBox="0 0 24 24">{icon}</svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1.25rem" }}>
                <span style={{ width:"3px", height:"14px", background:"#16a34a", borderRadius:"2px", display:"inline-block", flexShrink:0 }} />
                <h4 style={{ color:t.footerHead, fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:0 }}>Product</h4>
              </div>
              <ul className="flex flex-col gap-3">
                {["Platform Overview","AI Image Product Detection","Smart Inventory Management","Profit & Sales Analytics","Retail Insights Dashboard"].map(link => (
                  <li key={link}>
                    <a href="#"
                      style={{ display:"flex", alignItems:"center", gap:"0.4rem", color:t.footerLink, fontSize:"0.82rem", transition:"color 0.2s", textDecoration:"none" }}
                      onMouseEnter={e => { e.currentTarget.style.color="#16a34a"; e.currentTarget.firstChild.style.opacity="1"; e.currentTarget.firstChild.style.transform="translateX(2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color=t.footerLink; e.currentTarget.firstChild.style.opacity="0"; e.currentTarget.firstChild.style.transform="translateX(0)"; }}
                    >
                      <span style={{ opacity:0, transition:"opacity 0.2s, transform 0.2s", color:"#16a34a", fontWeight:700, fontSize:"0.9rem", lineHeight:1 }}>›</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1.25rem" }}>
                <span style={{ width:"3px", height:"14px", background:"#16a34a", borderRadius:"2px", display:"inline-block", flexShrink:0 }} />
                <h4 style={{ color:t.footerHead, fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:0 }}>Features</h4>
              </div>
              <ul className="flex flex-col gap-3">
                {["Computer Vision Product Recognition","Real-time Profit Tracking","Sales History & Reporting","Business KPI Analytics","Data Visualization Dashboard"].map(link => (
                  <li key={link}>
                    <a href="#"
                      style={{ display:"flex", alignItems:"center", gap:"0.4rem", color:t.footerLink, fontSize:"0.82rem", transition:"color 0.2s", textDecoration:"none" }}
                      onMouseEnter={e => { e.currentTarget.style.color="#16a34a"; e.currentTarget.firstChild.style.opacity="1"; e.currentTarget.firstChild.style.transform="translateX(2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color=t.footerLink; e.currentTarget.firstChild.style.opacity="0"; e.currentTarget.firstChild.style.transform="translateX(0)"; }}
                    >
                      <span style={{ opacity:0, transition:"opacity 0.2s, transform 0.2s", color:"#16a34a", fontWeight:700, fontSize:"0.9rem", lineHeight:1 }}>›</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Developer */}
            <div className="flex flex-col gap-6">
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1.25rem" }}>
                  <span style={{ width:"3px", height:"14px", background:"#16a34a", borderRadius:"2px", display:"inline-block", flexShrink:0 }} />
                  <h4 style={{ color:t.footerHead, fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:0 }}>Contact</h4>
                </div>
                <div className="flex flex-col gap-3">
                  <a href="mailto:contact.alphametrics.project@gmail.com"
                    style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem", color:t.footerLink, fontSize:"0.8rem", transition:"color 0.2s", wordBreak:"break-all", textDecoration:"none" }}
                    onMouseEnter={e => e.currentTarget.style.color="#16a34a"}
                    onMouseLeave={e => e.currentTarget.style.color=t.footerLink}
                  >
                    <svg style={{ width:"15px", height:"15px", marginTop:"2px", flexShrink:0 }} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span>alphametrics@gmail.com</span>
                  </a>
                  <a href="#"
                    style={{ display:"flex", alignItems:"center", gap:"0.6rem", color:t.footerLink, fontSize:"0.8rem", transition:"color 0.2s", textDecoration:"none" }}
                    onMouseEnter={e => e.currentTarget.style.color="#16a34a"}
                    onMouseLeave={e => e.currentTarget.style.color=t.footerLink}
                  >
                    <svg style={{ width:"15px", height:"15px", flexShrink:0 }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <div style={{ borderRadius:"12px", padding:"1rem", background:"rgba(22,163,74,0.07)", border:"1px solid rgba(22,163,74,0.2)" }}>
                <p style={{ color:"#16a34a", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem" }}>Developer</p>
                <p style={{ color:t.footerHead, fontSize:"0.92rem", fontWeight:700, marginBottom:"0.2rem" }}>Pranav</p>
                <p style={{ color:t.footerBody, fontSize:"0.78rem" }}>AI / ML Engineering Project</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderTop: `1px solid ${t.footerBottomBorder}` }}>
          <p style={{ color: t.footerBottom, fontSize: "0.78rem", letterSpacing: "0.02em" }}>
            © 2026 AlphaMetrics.AI Retail Intelligence Platform
          </p>
          <p style={{ color: t.footerBottom, fontSize: "0.75rem" }}>
            Built for educational and research purposes.
          </p>
        </div>
      </footer>
      {/* ── Login Modal ── */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-8 shadow-2xl relative"
            style={{ background: "#ffffff" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "1.2rem", fontWeight: 700 }}
              aria-label="Close"
            >✕</button>

            {/* Title */}
            <div className="text-center mb-7">
              <img src="/webname.png" alt="AlphaMetrics" className="mx-auto h-8 object-contain" />
              <p className="text-sm mt-3" style={{ color: "#6b7280" }}>Sign in to your account</p>
            </div>

            {loginError && (
              <div className="mb-4 px-4 py-3 rounded-lg text-sm font-medium" style={{ background: "#fee2e2", color: "#b91c1c" }}>
                {loginError}
              </div>
            )}

            <form onSubmit={submitLoginModal} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginFormChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all"
                  style={{ border: "1.5px solid #d1d5db", color: "#111827" }}
                  onFocus={e => (e.target.style.borderColor = "#10b981")}
                  onBlur={e => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>Password</label>
                <div className="relative">
                  <input
                    type={showLoginPass ? "text" : "password"}
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginFormChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all pr-11"
                    style={{ border: "1.5px solid #d1d5db", color: "#111827" }}
                    onFocus={e => (e.target.style.borderColor = "#10b981")}
                    onBlur={e => (e.target.style.borderColor = "#d1d5db")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}
                  >{showLoginPass ? "Hide" : "Show"}</button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white text-base transition-all hover:opacity-90"
                style={{ background: "#10b981", border: "none", cursor: "pointer" }}
              >Sign In</button>
            </form>

            <p className="text-center text-sm mt-5" style={{ color: "#6b7280" }}>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={openRegister}
                className="font-semibold hover:underline"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#10b981", padding: 0 }}
              >Register</button>
            </p>
          </div>
        </div>
      )}

      {/* ── Register Modal ── */}
      {showRegisterModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowRegisterModal(false)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex relative"
            style={{ maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Left green panel */}
            <div
              className="hidden md:flex flex-col justify-between p-8 flex-shrink-0"
              style={{ width: "50%", background: "linear-gradient(160deg,#1a5c3a 0%,#10b981 100%)" }}
            >
              <div>
                <p className="font-extrabold tracking-widest mb-8 text-base" style={{ color: "#ffffff", letterSpacing: "0.15em" }}>
                  Alpha<span style={{ color: "#a7f3d0" }}>Metrics</span>
                </p>
                <h2 className="text-2xl font-extrabold text-white leading-snug mb-3">
                  Start Your<br />Retail Journey
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
                  AI-powered insights to grow your business, predict demand, and optimise inventory.
                </p>
                <ul className="flex flex-col gap-3">
                  {["Real-time analytics dashboard","AI demand forecasting","Smart inventory control"].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.25)" }}>
                        <svg className="w-3 h-3" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-white text-sm font-semibold">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>© 2026 AlphaMetrics</p>
            </div>

            {/* Right white panel */}
            <div className="flex-1 bg-white p-8 overflow-y-auto" style={{ maxHeight: "90vh" }}>
              {/* Close */}
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "1.2rem", fontWeight: 700 }}
                aria-label="Close"
              >✕</button>

              {regSubmitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#d1fae5" }}>
                    <svg className="w-8 h-8" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold" style={{ color: "#1a2e5a" }}>Account Created!</p>
                  <p className="text-sm text-center" style={{ color: "#6b7280" }}>Redirecting you to sign in…</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#1a2e5a" }}>Create Account</h2>
                  <p className="text-sm mb-6" style={{ color: "#6b7280" }}>Fill in the details below to get started</p>

                  <form onSubmit={submitRegModal} className="flex flex-col gap-4">
                    {/* Row 1: Name + Occupation */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Full Name</label>
                        <input type="text" name="name" value={regForm.name} onChange={handleRegFormChange} placeholder="John Smith"
                          className="px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
                          style={regFieldStyle(regErrors.name)}
                          onFocus={e => (e.target.style.borderColor = "#10b981")}
                          onBlur={e => (e.target.style.borderColor = regErrors.name ? "#ef4444" : "#e5e7eb")} />
                        {regErrors.name && <p className="text-xs" style={{ color: "#ef4444" }}>{regErrors.name}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Occupation</label>
                        <select name="occupation" value={regForm.occupation} onChange={handleRegFormChange}
                          className="px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
                          style={regFieldStyle(regErrors.occupation)}
                          onFocus={e => (e.target.style.borderColor = "#10b981")}
                          onBlur={e => (e.target.style.borderColor = regErrors.occupation ? "#ef4444" : "#e5e7eb")}>
                          <option value="">Select…</option>
                          {OCCUPATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        {regErrors.occupation && <p className="text-xs" style={{ color: "#ef4444" }}>{regErrors.occupation}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Email Address</label>
                      <input type="email" name="email" value={regForm.email} onChange={handleRegFormChange} placeholder="you@example.com"
                        className="px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
                        style={regFieldStyle(regErrors.email)}
                        onFocus={e => (e.target.style.borderColor = "#10b981")}
                        onBlur={e => (e.target.style.borderColor = regErrors.email ? "#ef4444" : "#e5e7eb")} />
                      {regErrors.email && <p className="text-xs" style={{ color: "#ef4444" }}>{regErrors.email}</p>}
                    </div>

                    {/* Row 3: Password + Confirm */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Password</label>
                        <div className="relative">
                          <input type={showRegPass ? "text" : "password"} name="password" value={regForm.password} onChange={handleRegFormChange} placeholder="••••••••"
                            className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all pr-10"
                            style={regFieldStyle(regErrors.password)}
                            onFocus={e => (e.target.style.borderColor = "#10b981")}
                            onBlur={e => (e.target.style.borderColor = regErrors.password ? "#ef4444" : "#e5e7eb")} />
                          <button type="button" onClick={() => setShowRegPass(v => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold"
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
                            {showRegPass ? "Hide" : "Show"}
                          </button>
                        </div>
                        {regErrors.password && <p className="text-xs" style={{ color: "#ef4444" }}>{regErrors.password}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Confirm</label>
                        <div className="relative">
                          <input type={showRegConfirmPass ? "text" : "password"} name="confirmPassword" value={regForm.confirmPassword} onChange={handleRegFormChange} placeholder="••••••••"
                            className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all pr-10"
                            style={regFieldStyle(regErrors.confirmPassword)}
                            onFocus={e => (e.target.style.borderColor = "#10b981")}
                            onBlur={e => (e.target.style.borderColor = regErrors.confirmPassword ? "#ef4444" : "#e5e7eb")} />
                          <button type="button" onClick={() => setShowRegConfirmPass(v => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold"
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
                            {showRegConfirmPass ? "Hide" : "Show"}
                          </button>
                        </div>
                        {regErrors.confirmPassword && <p className="text-xs" style={{ color: "#ef4444" }}>{regErrors.confirmPassword}</p>}
                      </div>
                    </div>

                    <button type="submit"
                      className="w-full py-3 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 mt-1"
                      style={{ background: "#10b981", border: "none", cursor: "pointer" }}
                    >Create Account →</button>
                  </form>

                  <p className="text-center text-sm mt-5" style={{ color: "#6b7280" }}>
                    Already have an account?{" "}
                    <button type="button" onClick={openLogin}
                      className="font-semibold hover:underline"
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#10b981", padding: 0 }}
                    >Sign In</button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
