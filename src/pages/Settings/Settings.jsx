import React, { useState } from "react";
import {
  User,
  Bell,
  Moon,
  Globe,
  Key,
  Save,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  X,
} from "lucide-react";

export const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Yashi",
    email: "yashi@example.com",
    role: "Lead IoT Engineer",
  });

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");
  const [apiKey, setApiKey] = useState("nxf_live_99d1a88b4f17c802e3b1c64a78");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNewKey = () => {
    const newK = `nxf_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newK);
    setIsKeyModalOpen(true);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 840, margin: "0 auto", width: "100%" }}>
      {/* Top Header matching Reference Image Card 8 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF" }}>
            Profile Settings
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#64748B" }}>
            Manage identity, notifications, edge broker tokens & preferences
          </p>
        </div>

        {savedSuccess && (
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(0, 214, 143, 0.2)",
              border: "1px solid #00D68F",
              color: "#00D68F",
              fontSize: "0.82rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <CheckCircle2 size={15} />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <div className="glass-card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Profile Card matching Reference Image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            background: "rgba(6, 15, 37, 0.75)",
            borderRadius: 14,
            border: "1px solid rgba(30, 58, 110, 0.6)",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Avatar Circle with "Y" */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #087BFF 0%, #773CFF 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#FFFFFF",
                boxShadow: "0 0 20px rgba(119, 60, 255, 0.4)",
              }}
            >
              Y
            </div>

            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFFFFF" }}>
                {profile.name}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#AAB8D0" }}>
                {profile.email}
              </p>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#00D9FF",
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                Role: {profile.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              const newName = prompt("Enter new profile name:", profile.name);
              if (newName) setProfile({ ...profile, name: newName });
            }}
            className="btn-secondary"
            style={{ padding: "8px 16px", fontSize: "0.82rem" }}
          >
            Edit Profile
          </button>
        </div>

        {/* Settings List matching Reference Image */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Notifications Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              background: "rgba(6, 15, 37, 0.5)",
              borderRadius: 12,
              border: "1px solid rgba(30, 58, 110, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Bell size={18} color="#00D9FF" />
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#FFFFFF" }}>
                  Notifications
                </div>
                <div style={{ fontSize: "0.76rem", color: "#64748B" }}>
                  Receive real-time push and webhook alerts on threshold triggers
                </div>
              </div>
            </div>

            <div
              onClick={() => setNotifications(!notifications)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 20,
                background: notifications ? "#00D68F" : "rgba(30, 58, 110, 0.7)",
                padding: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  transform: notifications ? "translateX(20px)" : "translateX(0)",
                  transition: "transform 0.25s ease",
                }}
              />
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              background: "rgba(6, 15, 37, 0.5)",
              borderRadius: 12,
              border: "1px solid rgba(30, 58, 110, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Moon size={18} color="#773CFF" />
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#FFFFFF" }}>
                  Dark Mode
                </div>
                <div style={{ fontSize: "0.76rem", color: "#64748B" }}>
                  High-contrast cyber navy background with cyan & purple glowing accents
                </div>
              </div>
            </div>

            <div
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 20,
                background: darkMode ? "#087BFF" : "rgba(30, 58, 110, 0.7)",
                padding: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  transform: darkMode ? "translateX(20px)" : "translateX(0)",
                  transition: "transform 0.25s ease",
                }}
              />
            </div>
          </div>

          {/* Language Dropdown */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              background: "rgba(6, 15, 37, 0.5)",
              borderRadius: 12,
              border: "1px solid rgba(30, 58, 110, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Globe size={18} color="#00D9FF" />
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#FFFFFF" }}>
                  Language
                </div>
                <div style={{ fontSize: "0.76rem", color: "#64748B" }}>
                  Select platform UI localization
                </div>
              </div>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field"
              style={{ width: 140, height: 36, padding: "4px 8px", fontSize: "0.82rem" }}
            >
              <option value="English">English</option>
              <option value="German">Deutsch</option>
              <option value="Japanese">日本語</option>
              <option value="Spanish">Español</option>
            </select>
          </div>

          {/* API Access Key matching reference image */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              background: "rgba(6, 15, 37, 0.5)",
              borderRadius: 12,
              border: "1px solid rgba(30, 58, 110, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Key size={18} color="#FFB020" />
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#FFFFFF" }}>
                  API Access
                </div>
                <div style={{ fontSize: "0.76rem", color: "#64748B" }}>
                  REST & WebSocket authentication bearer token for IoT edge gateways
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateNewKey}
              className="btn-secondary"
              style={{ padding: "8px 16px", fontSize: "0.82rem", borderColor: "#FFB020", color: "#FFD074" }}
            >
              Generate Key
            </button>
          </div>
        </div>

        {/* Save Changes Button matching Reference Image */}
        <button
          onClick={handleSaveChanges}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "0.95rem",
            marginTop: 10,
          }}
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* API Key Modal */}
      {isKeyModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 20,
          }}
        >
          <div
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: 480,
              padding: 26,
              background: "rgba(8, 21, 47, 0.98)",
              border: "1px solid #FFB020",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Key size={20} color="#FFB020" />
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFFFFF" }}>
                  Generated Edge API Token
                </h3>
              </div>
              <button
                onClick={() => setIsKeyModalOpen(false)}
                style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: "0.82rem", color: "#AAB8D0", marginBottom: 14 }}>
              Include this API key in your IoT device HTTP headers as <code>Authorization: Bearer &lt;token&gt;</code>.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(5, 11, 31, 0.8)",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(30, 58, 110, 0.6)",
              }}
            >
              <code style={{ fontSize: "0.85rem", color: "#00D9FF", fontFamily: "var(--font-mono)", flex: 1 }}>
                {apiKey}
              </code>
              <button
                onClick={handleCopyKey}
                style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer" }}
                title="Copy Key"
              >
                {copied ? <Check size={16} color="#00D68F" /> : <Copy size={16} />}
              </button>
            </div>

            <button
              onClick={() => setIsKeyModalOpen(false)}
              className="btn-primary"
              style={{ width: "100%", marginTop: 20 }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
