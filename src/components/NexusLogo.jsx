import React from "react";

export const NexusLogo = ({ size = 34, showText = true, subtitle = null }) => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      {/* 3D Stylized Neon Ribbon "N" Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 0 12px rgba(0, 217, 255, 0.45))",
          flexShrink: 0,
        }}
      >
        <defs>
          <linearGradient id="neonN1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="60%" stopColor="#087BFF" />
            <stop offset="100%" stopColor="#773CFF" />
          </linearGradient>
          <linearGradient id="neonN2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#773CFF" />
            <stop offset="50%" stopColor="#087BFF" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left vertical stem with isometric cut */}
        <path
          d="M 18 16 L 36 16 L 36 84 L 18 84 Z"
          fill="url(#neonN1)"
          rx="5"
        />

        {/* Diagonal sweeping beam */}
        <path
          d="M 28 16 L 46 16 L 82 84 L 64 84 Z"
          fill="url(#neonN2)"
          opacity="0.95"
        />

        {/* Right vertical stem */}
        <path
          d="M 64 16 L 82 16 L 82 84 L 64 84 Z"
          fill="url(#neonN1)"
          rx="5"
        />

        {/* Cyan highlight accents */}
        <circle cx="27" cy="22" r="4" fill="#FFFFFF" opacity="0.9" />
        <circle cx="73" cy="78" r="4" fill="#00D9FF" opacity="0.9" />
      </svg>

      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <span
              style={{
                fontSize: size > 40 ? "1.6rem" : "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                background: "linear-gradient(90deg, #FFFFFF 0%, #E2EDFF 40%, #00D9FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Nexus
            </span>
            <span
              style={{
                fontSize: size > 40 ? "1.6rem" : "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                background: "linear-gradient(90deg, #087BFF 0%, #773CFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Flow
            </span>
          </div>
          {subtitle && (
            <span
              style={{
                fontSize: "0.68rem",
                color: "#64748B",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
