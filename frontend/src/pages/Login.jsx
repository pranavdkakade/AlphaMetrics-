import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY, loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await loginUser(form.email, form.password);
      localStorage.setItem(AUTH_TOKEN_KEY, data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg,#e8f0fe 0%,#dbeafe 50%,#e0f2fe 100%)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl"
        style={{ background: "#ffffff" }}
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <img src="/webname.png" alt="AlphaMetrics" className="mx-auto h-8 object-contain" />
          <p className="text-sm mt-3" style={{ color: "#6b7280" }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm font-medium" style={{ background: "#fee2e2", color: "#b91c1c" }}>
            {error}
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: "#374151" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handle}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all"
              style={{ border: "1.5px solid #d1d5db", color: "#111827" }}
              onFocus={e => (e.target.style.borderColor = "#10b981")}
              onBlur={e => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: "#374151" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handle}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all pr-11"
                style={{ border: "1.5px solid #d1d5db", color: "#111827" }}
                onFocus={e => (e.target.style.borderColor = "#10b981")}
                onBlur={e => (e.target.style.borderColor = "#d1d5db")}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 mt-1"
            style={{ background: loading ? "#6ee7b7" : "#10b981", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#6b7280" }}>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold hover:underline" style={{ color: "#10b981" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
