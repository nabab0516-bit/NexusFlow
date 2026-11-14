import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";
import { NexusLogo } from "../../components/NexusLogo";

export const Login = ({ onLoginSuccess, onNavigateRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email address and password.");
      return;
    }

    setError("");
    setLoading(true);

    // Frontend demo only. Backend authentication is not connected.
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess?.();
    }, 600);
  };

  const handleGoogleDemo = () => {
    setError("Google authentication is not configured yet.");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError("Password reset is not available in this frontend demo.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "radial-gradient(ellipse at center, #0a1838 0%, #050B1F 70%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient neon glow spheres */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(119, 60, 255, 0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Glassmorphic Container */}
      <div
        className="glass-card auth-layout-grid"
        style={{
          width: "100%",
          maxWidth: "960px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(0, 217, 255, 0.3)",
          boxShadow:
            "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 217, 255, 0.15)",
        }}
      >
        {/* Left Side: Branding */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(8, 21, 47, 0.95) 0%, rgba(5, 11, 31, 0.98) 100%)",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid rgba(30, 58, 110, 0.5)",
            position: "relative",
          }}
        >
          <div>
            <NexusLogo size={42} />

            <div
              style={{
                marginTop: 12,
                fontSize: "0.85rem",
                color: "#00D9FF",
                letterSpacing: "0.2em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Monitor • Automate • Innovate
            </div>

            <p
              style={{
                marginTop: 16,
                color: "#AAB8D0",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                maxWidth: "380px",
              }}
            >
              Visual IoT Telemetry & Rule Engine platform engineered for
              real-time sensor processing, custom drag-and-drop workflow
              automation, and edge telemetry analytics.
            </p>
          </div>

          {/* Holographic Cyber Globe */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "240px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <svg
              width="220"
              height="220"
              viewBox="0 0 200 200"
              style={{
                filter: "drop-shadow(0 0 25px rgba(0, 217, 255, 0.5))",
                animation: "pulse-dot 4s infinite ease-in-out",
              }}
            >
              <ellipse
                cx="100"
                cy="100"
                rx="90"
                ry="35"
                fill="none"
                stroke="rgba(0, 217, 255, 0.5)"
                strokeWidth="1.5"
                transform="rotate(-25 100 100)"
                strokeDasharray="6 4"
              />

              <ellipse
                cx="100"
                cy="100"
                rx="85"
                ry="35"
                fill="none"
                stroke="rgba(119, 60, 255, 0.6)"
                strokeWidth="1.5"
                transform="rotate(35 100 100)"
              />

              <circle
                cx="100"
                cy="100"
                r="60"
                fill="url(#globeGrad)"
                stroke="#00D9FF"
                strokeWidth="1.5"
              />

              <ellipse
                cx="100"
                cy="100"
                rx="30"
                ry="60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
              />

              <line
                x1="40"
                y1="100"
                x2="160"
                y2="100"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
              />

              <line
                x1="45"
                y1="80"
                x2="155"
                y2="80"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              <line
                x1="45"
                y1="120"
                x2="155"
                y2="120"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              <circle
                cx="85"
                cy="85"
                r="4"
                fill="#00D9FF"
                filter="drop-shadow(0 0 6px #00D9FF)"
              />

              <circle
                cx="120"
                cy="75"
                r="3.5"
                fill="#00D68F"
                filter="drop-shadow(0 0 6px #00D68F)"
              />

              <circle
                cx="115"
                cy="120"
                r="4.5"
                fill="#773CFF"
                filter="drop-shadow(0 0 6px #773CFF)"
              />

              <circle
                cx="75"
                cy="115"
                r="3"
                fill="#FFB020"
                filter="drop-shadow(0 0 6px #FFB020)"
              />

              <defs>
                <radialGradient id="globeGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#087BFF" />
                  <stop offset="60%" stopColor="#0c1d47" />
                  <stop offset="100%" stopColor="#050B1F" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Project Badges */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="badge badge-info" style={{ fontSize: "0.74rem" }}>
              React Flow v12
            </span>

            <span
              className="badge badge-purple"
              style={{ fontSize: "0.74rem" }}
            >
              MERN Stack
            </span>

            <span
              className="badge badge-online"
              style={{ fontSize: "0.74rem" }}
            >
              MQTT / WebSockets
            </span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div
          style={{
            background: "rgba(8, 21, 47, 0.85)",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Welcome Back!
            </h2>

            <p
              style={{
                color: "#AAB8D0",
                fontSize: "0.9rem",
                marginTop: 6,
              }}
            >
              Sign in to continue to your IoT Control Center
            </p>

            <p
              style={{
                color: "#00D9FF",
                fontSize: "0.76rem",
                marginTop: 8,
              }}
            >
              Frontend demo: backend authentication is not enabled.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            {/* Email Field */}
            <div>
              <label
                htmlFor="login-email"
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#E2EDFF",
                  marginBottom: 6,
                }}
              >
                Email Address
              </label>

              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  color="#64748B"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />

                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="name@nexusflow.io"
                  className="input-field"
                  style={{ paddingLeft: 42 }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <label
                  htmlFor="login-password"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#E2EDFF",
                  }}
                >
                  Password
                </label>

                <a
                  href="#forgot"
                  onClick={handleForgotPassword}
                  style={{
                    fontSize: "0.8rem",
                    color: "#00D9FF",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  color="#64748B"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="input-field"
                  style={{ paddingLeft: 42, paddingRight: 40 }}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#64748B",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: 16,
                  height: 16,
                  accentColor: "#087BFF",
                  cursor: "pointer",
                }}
              />

              <span
                style={{
                  fontSize: "0.84rem",
                  color: "#AAB8D0",
                  userSelect: "none",
                }}
              >
                Remember Me
              </span>
            </label>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                style={{
                  color: "#FF7B8B",
                  fontSize: "0.82rem",
                  margin: 0,
                }}
              >
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "1rem",
                marginTop: 6,
                letterSpacing: "0.02em",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Please wait..." : "Login"}
              {!loading && <ArrowRight size={18} />}
            </button>

            {/* OR Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "4px 0",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(30, 58, 110, 0.5)",
                }}
              />

              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#64748B",
                  fontWeight: 700,
                }}
              >
                OR
              </span>

              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(30, 58, 110, 0.5)",
                }}
              />
            </div>

            {/* Google Demo Button */}
            <button
              type="button"
              onClick={handleGoogleDemo}
              className="btn-secondary"
              style={{
                width: "100%",
                padding: "10px",
                gap: 10,
                fontSize: "0.88rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />

                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <span>Continue with Google</span>
            </button>
          </form>

          {/* Switch to Register */}
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <span style={{ fontSize: "0.85rem", color: "#AAB8D0" }}>
              Don't have an account?{" "}
            </span>

            <button
              type="button"
              onClick={onNavigateRegister}
              style={{
                background: "none",
                border: "none",
                color: "#00D9FF",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};