import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

            <Link
              to="/login"
              className="text-white px-5 py-2 rounded-lg font-semibold"
              style={{ fontFamily: "'Inter',sans-serif", background: t.loginBtn, fontSize: "0.9rem", letterSpacing: "0.02em", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = t.loginBtnHover}
              onMouseLeave={e => e.currentTarget.style.background = t.loginBtn}
            >Login</Link>
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
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white text-center rounded-lg font-semibold mt-3 py-2.5"
              style={{ background: t.loginBtn, fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", letterSpacing: "0.02em", transition: "background 0.2s" }}
            >Login</Link>
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
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg font-semibold text-white text-base transition-all hover:opacity-90"
              style={{ background: "#10b981" }}
            >Get Started Free</Link>
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
              <a href="/login" className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90" style={{ background: "#10b981" }}>
                Start Optimizing Today
              </a>
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
      <footer style={{ background: t.footerBg, borderTop: `1px solid ${t.footerBorder}`, fontFamily: "'Inter',sans-serif", transition: "background 0.4s ease" }}>
        <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <img
              src="/webname.png"
              alt="AlphaMetrics"
              className="h-8 object-contain self-start"
              style={{ filter: dark ? "invert(1)" : "none", transition: "filter 0.4s ease" }}
            />
            <p style={{ color: t.footerBody, fontSize: "0.875rem", lineHeight: "1.75", letterSpacing: "0.01em" }}>
              The ultimate AI-powered SaaS platform for smart retail management. Turn data into actionable insights and dominate your market.
            </p>
            <div className="flex items-center gap-4 mt-1">
              {[
                { label: "LinkedIn",  path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
                { label: "Twitter",   path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.03-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.58 1.64.9a4.52 4.52 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76A4.5 4.5 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0023 3z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2z" },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label} className="flex items-center gap-1.5 cursor-pointer"
                  onMouseEnter={e => { e.currentTarget.querySelector("svg").style.stroke = "#16a34a"; e.currentTarget.querySelector("span").style.color = "#16a34a"; }}
                  onMouseLeave={e => { e.currentTarget.querySelector("svg").style.stroke = "#94a3b8"; e.currentTarget.querySelector("span").style.color = "#94a3b8"; }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24" style={{ transition: "stroke 0.2s" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
                  </svg>
                  <span style={{ color: "#94a3b8", fontSize: "0.78rem", fontWeight: 500, transition: "color 0.2s", letterSpacing: "0.01em" }}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ color: t.footerHead, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Product</h4>
            <ul className="flex flex-col gap-3">
              {["Platform Overview","Predictive Analytics","AI Engine","Inventory Control","Integrations"].map(link => (
                <li key={link}>
                  <a href="#" style={{ color: t.footerLink, fontSize: "0.875rem", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#16a34a"}
                    onMouseLeave={e => e.currentTarget.style.color = t.footerLink}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: t.footerHead, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Company</h4>
            <ul className="flex flex-col gap-3">
              {["About AlphaMetrics","Careers","Latest News","Privacy Policy","Terms of Service"].map(link => (
                <li key={link}>
                  <a href="#" style={{ color: t.footerLink, fontSize: "0.875rem", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#16a34a"}
                    onMouseLeave={e => e.currentTarget.style.color = t.footerLink}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: t.footerHead, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Contact Us</h4>
            <ul className="flex flex-col gap-4">
              {[
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "hello@alphametrics.ai" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "+1 (555) 000-1234" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "100 Market St, San Francisco, CA 94105" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 cursor-pointer"
                  onMouseEnter={e => e.currentTarget.querySelector("span").style.color = "#16a34a"}
                  onMouseLeave={e => e.currentTarget.querySelector("span").style.color = t.footerLink}
                >
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span style={{ color: t.footerLink, fontSize: "0.875rem", lineHeight: "1.5", transition: "color 0.2s" }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: `1px solid ${t.footerBottomBorder}` }}>
          <p style={{ color: t.footerBottom, fontSize: "0.78rem", letterSpacing: "0.02em", fontFamily: "'Inter',sans-serif" }}>
            © 2026 AlphaMetrics. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy","Cookies","Security"].map(link => (
              <a key={link} href="#"
                style={{ color: t.footerBottom, fontSize: "0.78rem", letterSpacing: "0.03em", fontWeight: 500, transition: "color 0.2s", fontFamily: "'Inter',sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.color = "#16a34a"}
                onMouseLeave={e => e.currentTarget.style.color = t.footerBottom}
              >{link}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
