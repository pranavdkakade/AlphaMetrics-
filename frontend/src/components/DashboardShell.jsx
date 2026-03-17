import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { AUTH_TOKEN_KEY, getAuthenticatedUser } from "../services/api";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Inventory", to: "/inventory" },
  { label: "Sell", to: "/sell" },
  { label: "Sales History", to: "/history" },
];

export default function DashboardShell({ title, subtitle, children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({
    full_name: "Loading...",
    email: "Loading...",
    occupation: "Loading...",
  });

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        if (active) {
          setUser({
            full_name: "Guest User",
            email: "Not available",
            occupation: "Retail Professional",
          });
        }
        return;
      }

      const profile = await getAuthenticatedUser(token);
      if (active && profile) {
        setUser({
          full_name: profile.full_name || "Retail User",
          email: profile.email || "Not available",
          occupation: profile.occupation || "Retail Professional",
        });
      }
    }

    loadUser();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg,#e8f0fe 0%,#f8fbff 50%,#e6f9f1 100%)" }}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden mb-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700"
        >
          Navigation and Profile
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          <aside className={`lg:col-span-3 ${menuOpen ? "block" : "hidden"} lg:block`}>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Control Panel</p>
              <h3 className="mt-2 text-lg font-bold text-slate-800">AlphaMetrics Workspace</h3>

              <nav className="mt-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                  const active = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                      style={{
                        background: active ? "#e6f9f1" : "transparent",
                        color: active ? "#047857" : "#334155",
                        border: active ? "1px solid #a7f3d0" : "1px solid transparent",
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">User Details</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{user.full_name}</p>
                <p className="mt-1 text-xs text-slate-600 break-all">{user.email}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">Field: {user.occupation}</p>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-9">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Retail Intelligence Suite</p>
              <h1 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
              <p className="mt-2 text-sm md:text-base text-slate-600">{subtitle}</p>
            </div>

            <div className="mt-5 md:mt-6 space-y-5 md:space-y-6">{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
