import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { NexusLogo } from "../../components/NexusLogo";

export const Register = ({ onRegisterSuccess, onNavigateLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.fullName.trim().length < 2) {
      setError("Full name must contain at least 2 characters.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (
      formData.phone.trim() &&
      !/^\+?[0-9\s()-]{7,20}$/.test(formData.phone.trim())
    ) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setLoading(true);

    // Frontend demo only. No server account is created.
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess?.();
    }, 600);
  };

  const inputStyle = {
    paddingLeft: 40,
    width: "100%",
  };

  const iconStyle = {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#E2EDFF",
    marginBottom: 5,
  };

  const passwordButtonStyle = {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#64748B",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "20%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(119, 60, 255, 0.16) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Glassmorphic Container */}
      <div
        className="glass-card auth-layout-grid"
        style={{
          width: "100%",
          maxWidth: "980px",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(119, 60, 255, 0.35)",
          boxShadow:
            "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(119, 60, 255, 0.15)",
        }}
      >
        {/* Left Side: Branding */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(8, 21, 47, 0.95) 0%, rgba(5, 11, 31, 0.98) 100%)",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid rgba(30, 58, 110, 0.5)",
          }}
        >
          <div>
            <NexusLogo size={36} />

            <h3
              style={{
                marginTop: 18,
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Architect Next-Gen IoT Automation
            </h3>

            <p
              style={{
                marginTop: 8,
                color: "#AAB8D0",
                fontSize: "0.88rem",
                lineHeight: 1.5,
              }}
            >
              Connect edge sensors, build reactive logic workflows with
              drag-and-drop React Flow nodes, and monitor real-time telemetry.
            </p>
          </div>

          {/* Isometric Cyber City Illustration */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "230px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <svg
              width="240"
              height="220"
              viewBox="0 0 240 220"
              fill="none"
              style={{
                filter: "drop-shadow(0 0 20px rgba(8, 123, 255, 0.45))",
              }}
            >
              <path
                d="M 120 40 L 220 95 L 120 150 L 20 95 Z"
                fill="rgba(8, 21, 47, 0.8)"
                stroke="#00D9FF"
                strokeWidth="1.5"
              />

              <path
                d="M 120 150 L 220 95 L 220 115 L 120 170 L 20 115 L 20 95 Z"
                fill="rgba(5, 11, 31, 0.9)"
                stroke="rgba(0, 217, 255, 0.4)"
                strokeWidth="1"
              />

              <path
                d="M 105 50 L 135 35 L 135 110 L 105 125 Z"
                fill="rgba(8, 123, 255, 0.5)"
                stroke="#00D9FF"
                strokeWidth="1"
              />

              <path
                d="M 135 35 L 155 45 L 155 120 L 135 110 Z"
                fill="rgba(119, 60, 255, 0.5)"
                stroke="#773CFF"
                strokeWidth="1"
              />

              <path
                d="M 105 50 L 125 40 L 155 45 L 135 55 Z"
                fill="#00D9FF"
                opacity="0.6"
              />

              <path
                d="M 60 75 L 85 62 L 85 115 L 60 128 Z"
                fill="rgba(0, 217, 255, 0.3)"
                stroke="#00D9FF"
                strokeWidth="1"
              />

              <path
                d="M 85 62 L 100 70 L 100 123 L 85 115 Z"
                fill="rgba(8, 123, 255, 0.4)"
                stroke="#087BFF"
                strokeWidth="1"
              />

              <path
                d="M 150 78 L 175 65 L 175 120 L 150 133 Z"
                fill="rgba(119, 60, 255, 0.4)"
                stroke="#773CFF"
                strokeWidth="1"
              />

              <path
                d="M 175 65 L 190 73 L 190 128 L 175 120 Z"
                fill="rgba(157, 78, 221, 0.4)"
                stroke="#9D4EDD"
                strokeWidth="1"
              />

              <line
                x1="120"
                y1="35"
                x2="120"
                y2="5"
                stroke="#00D9FF"
                strokeWidth="2"
                strokeDasharray="4 2"
              />

              <circle
                cx="120"
                cy="5"
                r="4"
                fill="#00D9FF"
                filter="drop-shadow(0 0 8px #00D9FF)"
              />

              <line
                x1="72"
                y1="62"
                x2="72"
                y2="25"
                stroke="#087BFF"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />

              <circle cx="72" cy="25" r="3" fill="#087BFF" />

              <line
                x1="162"
                y1="65"
                x2="162"
                y2="20"
                stroke="#773CFF"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />

              <circle
                cx="162"
                cy="20"
                r="3"
                fill="#773CFF"
                filter="drop-shadow(0 0 6px #773CFF)"
              />
            </svg>
          </div>

          {/* Project Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.8rem",
                color: "#AAB8D0",
              }}
            >
              <CheckCircle2 size={15} color="#00D68F" />
              <span>Full Visual Flow rule canvas included</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.8rem",
                color: "#AAB8D0",
              }}
            >
              <CheckCircle2 size={15} color="#00D68F" />
              <span>Live execution simulation & JSON export</span>
            </div>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div
          style={{
            background: "rgba(8, 21, 47, 0.85)",
            padding: "40px 38px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h2
              style={{
                fontSize: "1.65rem",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Create Account
            </h2>

            <p
              style={{
                color: "#AAB8D0",
                fontSize: "0.88rem",
                marginTop: 4,
              }}
            >
              Join NexusFlow today
            </p>

            <p
              style={{
                color: "#00D9FF",
                fontSize: "0.76rem",
                marginTop: 8,
              }}
            >
              Frontend demo registration only; no account is created on a
              server.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Full Name */}
            <div>
              <label htmlFor="register-name" style={labelStyle}>
                Full Name
              </label>

              <div style={{ position: "relative" }}>
                <User size={15} color="#64748B" style={iconStyle} />

                <input
                  id="register-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input-field"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="register-email" style={labelStyle}>
                Email Address
              </label>

              <div style={{ position: "relative" }}>
                <Mail size={15} color="#64748B" style={iconStyle} />

                <input
                  id="register-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="input-field"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="register-phone" style={labelStyle}>
                Phone Number <span style={{ color: "#64748B" }}>(Optional)</span>
              </label>

              <div style={{ position: "relative" }}>
                <Phone size={15} color="#64748B" style={iconStyle} />

                <input
                  id="register-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="input-field"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="register-password" style={labelStyle}>
                Password
              </label>

              <div style={{ position: "relative" }}>
                <Lock size={15} color="#64748B" style={iconStyle} />

                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter strong password"
                  className="input-field"
                  style={{ paddingLeft: 40, paddingRight: 40 }}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={passwordButtonStyle}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="register-confirm-password" style={labelStyle}>
                Confirm Password
              </label>

              <div style={{ position: "relative" }}>
                <Lock size={15} color="#64748B" style={iconStyle} />

                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="input-field"
                  style={{ paddingLeft: 40, paddingRight: 40 }}
                />

                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  style={passwordButtonStyle}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                style={{
                  color: "#FF7B8B",
                  fontSize: "0.8rem",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {error}
              </p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "11px",
                fontSize: "0.96rem",
                marginTop: 6,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating Account..." : "Register"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          {/* Switch to Login */}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <span style={{ fontSize: "0.84rem", color: "#AAB8D0" }}>
              Already have an account?{" "}
            </span>

            <button
              type="button"
              onClick={onNavigateLogin}
              style={{
                background: "none",
                border: "none",
                color: "#00D9FF",
                fontWeight: 600,
                fontSize: "0.84rem",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};