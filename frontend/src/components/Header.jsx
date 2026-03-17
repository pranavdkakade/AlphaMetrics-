import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY, verifyAuthToken } from "../services/api";

const LIGHT = {
  headerBg:     "#ffffff",
  headerBorder: "#e5e7eb",
  headerShadow: "0 2px 8px rgba(0,0,0,0.06)",
  navText:      "#374151",
  navHover:     "#16a34a",
  loginBtn:     "#14b24e",
  loginBtnHover:"#149644",
};

const DARK = {
  headerBg:     "#070c18",
  headerBorder: "#111d35",
  headerShadow: "0 2px 16px rgba(0,0,0,0.7)",
  navText:      "#6b7d95",
  navHover:     "#10b981",
  loginBtn:     "#10b981",
  loginBtnHover:"#059669",
};

export default function Header() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    async function syncAuthState() {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        if (active) setIsAuthenticated(false);
        return;
      }
      const valid = await verifyAuthToken(token);
      if (active) {
        if (!valid) localStorage.removeItem(AUTH_TOKEN_KEY);
        setIsAuthenticated(valid);
      }
    }

    syncAuthState();
    const onStorage = () => syncAuthState();
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
    setMenuOpen(false);
    navigate("/");
  };

  const t = dark ? DARK : LIGHT;

  const navLinkStyle = {
    fontFamily: "'Inter',sans-serif",
    color: t.navText,
    fontSize: "0.9rem",
    letterSpacing: "0.01em",
    transition: "color 0.2s",
    textDecoration: "none",
    fontWeight: 500,
    cursor: "pointer",
  };

  return (
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
            href="/"
            style={navLinkStyle}
            onMouseEnter={e => e.currentTarget.style.color = t.navHover}
            onMouseLeave={e => e.currentTarget.style.color = t.navText}
          >Home</a>
          <a
            href="/#capabilities"
            style={navLinkStyle}
            onMouseEnter={e => e.currentTarget.style.color = t.navHover}
            onMouseLeave={e => e.currentTarget.style.color = t.navText}
          >Capabilities</a>
          <a
            href="/#the-process"
            style={navLinkStyle}
            onMouseEnter={e => e.currentTarget.style.color = t.navHover}
            onMouseLeave={e => e.currentTarget.style.color = t.navText}
          >The Process</a>
          <a
            href="/dashboard"
            style={{ ...navLinkStyle, color: "#10b981", fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.color = t.navHover}
            onMouseLeave={e => e.currentTarget.style.color = "#10b981"}
          >Dashboard</a>

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
            onClick={handleLogout}
            className="text-white px-5 py-2 rounded-lg font-semibold"
            style={{ fontFamily: "'Inter',sans-serif", background: t.loginBtn, fontSize: "0.9rem", letterSpacing: "0.02em", transition: "background 0.2s", border: "none", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.background = t.loginBtnHover}
            onMouseLeave={e => e.currentTarget.style.background = t.loginBtn}
          >Logout</button>
        </nav>

        {/* Mobile right side: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setDark(d => !d)}
            style={{ width: "40px", height: "22px", borderRadius: "11px", border: "none", padding: 0, cursor: "pointer", position: "relative", background: dark ? "#10b981" : "#d1d5db", transition: "background 0.35s ease", flexShrink: 0, outline: "none" }}
            aria-label="Toggle theme"
          >
            <span style={{ position: "absolute", top: "3px", left: dark ? "19px" : "3px", width: "16px", height: "16px", borderRadius: "50%", background: "#ffffff", transition: "left 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", lineHeight: 1 }}>
              {dark ? "🌙" : "☀️"}
            </span>
          </button>

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
            { label: "Home",         href: "/" },
            { label: "Capabilities", href: "/#capabilities" },
            { label: "The Process",  href: "/#the-process" },
            { label: "Dashboard",    href: "/dashboard" },
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "10px 0", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "0.95rem", color: item.label === "Dashboard" ? "#10b981" : t.navText, borderBottom: `1px solid ${t.headerBorder}`, transition: "color 0.2s", display: "block", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = t.navHover}
              onMouseLeave={e => e.currentTarget.style.color = item.label === "Dashboard" ? "#10b981" : t.navText}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            className="text-white text-center rounded-lg font-semibold mt-3 py-2.5"
            style={{ background: t.loginBtn, fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", letterSpacing: "0.02em", transition: "background 0.2s", border: "none", cursor: "pointer", width: "100%" }}
          >Logout</button>
        </div>
      </div>
    </header>
  );
}
