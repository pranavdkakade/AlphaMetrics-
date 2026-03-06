import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OCCUPATIONS = [
  "Retail Store Owner", "Retail Manager", "Inventory Analyst",
  "Sales Executive", "Supply Chain Manager", "Business Analyst", "Entrepreneur", "Other",
];
const FEATURES = [
  "Real-time analytics dashboard",
  "AI demand forecasting",
  "Smart inventory control",
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", occupation: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.occupation) e.occupation = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Required";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => navigate("/login"), 1800);
  };

  const fs = (hasErr) => ({ border: `1.5px solid ${hasErr ? "#ef4444" : "#e5e7eb"}`, color: "#111827", background: "#fff" });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg,#e8f0fe 0%,#dbeafe 50%,#e0f2fe 100%)" }}
    >
      <div className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex">

        {/* ── Left green panel ── */}
        <div
          className="hidden md:flex flex-col justify-between p-8 flex-shrink-0"
          style={{ width: "42%", background: "linear-gradient(160deg,#1a5c3a 0%,#10b981 100%)" }}
        >
          <div>
            <img src="/webname.png" alt="AlphaMetrics" className="h-8 object-contain mb-8"
              style={{ filter: "brightness(0) invert(1)" }} />
            <h2 className="text-2xl font-extrabold text-white leading-snug mb-3">
              Start Your<br />Retail Journey
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
              AI-powered insights to grow your business, predict demand, and optimise inventory.
            </p>
            <ul className="flex flex-col gap-3">
              {FEATURES.map(f => (
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

        {/* ── Right white panel ── */}
        <div className="flex-1 bg-white p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 h-full py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#d1fae5" }}>
                <svg className="w-8 h-8" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-bold" style={{ color: "#1a2e5a" }}>Account Created!</p>
              <p className="text-sm" style={{ color: "#6b7280" }}>Redirecting you to login…</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#1a2e5a" }}>Create Account</h2>
              <p className="text-sm mb-6" style={{ color: "#6b7280" }}>Fill in the details below to get started</p>

              <form onSubmit={submit} className="flex flex-col gap-4">
                {/* Row 1: Name + Occupation */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={handle} placeholder="John Smith"
                      className="px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
                      style={fs(errors.name)}
                      onFocus={e => (e.target.style.borderColor = "#10b981")}
                      onBlur={e => (e.target.style.borderColor = errors.name ? "#ef4444" : "#e5e7eb")} />
                    {errors.name && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Occupation</label>
                    <select name="occupation" value={form.occupation} onChange={handle}
                      className="px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
                      style={fs(errors.occupation)}
                      onFocus={e => (e.target.style.borderColor = "#10b981")}
                      onBlur={e => (e.target.style.borderColor = errors.occupation ? "#ef4444" : "#e5e7eb")}>
                      <option value="">Select…</option>
                      {OCCUPATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {errors.occupation && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.occupation}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com"
                    className="px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
                    style={fs(errors.email)}
                    onFocus={e => (e.target.style.borderColor = "#10b981")}
                    onBlur={e => (e.target.style.borderColor = errors.email ? "#ef4444" : "#e5e7eb")} />
                  {errors.email && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.email}</p>}
                </div>

                {/* Row 3: Password + Confirm */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Password</label>
                    <div className="relative">
                      <input type={showPass ? "text" : "password"} name="password" value={form.password} onChange={handle} placeholder="••••••••"
                        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all pr-10"
                        style={fs(errors.password)}
                        onFocus={e => (e.target.style.borderColor = "#10b981")}
                        onBlur={e => (e.target.style.borderColor = errors.password ? "#ef4444" : "#e5e7eb")} />
                      <button type="button" onClick={() => setShowPass(v => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold"
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
                        {showPass ? "Hide" : "Show"}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.password}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6b7280" }}>Confirm</label>
                    <div className="relative">
                      <input type={showConfirmPass ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handle} placeholder="••••••••"
                        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all pr-10"
                        style={fs(errors.confirmPassword)}
                        onFocus={e => (e.target.style.borderColor = "#10b981")}
                        onBlur={e => (e.target.style.borderColor = errors.confirmPassword ? "#ef4444" : "#e5e7eb")} />
                      <button type="button" onClick={() => setShowConfirmPass(v => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold"
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
                        {showConfirmPass ? "Hide" : "Show"}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.confirmPassword}</p>}
                  </div>
                </div>

                <button type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 mt-1"
                  style={{ background: "#10b981", border: "none", cursor: "pointer" }}>
                  Create Account →
                </button>
              </form>

              <p className="text-center text-sm mt-5" style={{ color: "#6b7280" }}>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold hover:underline" style={{ color: "#10b981" }}>Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
