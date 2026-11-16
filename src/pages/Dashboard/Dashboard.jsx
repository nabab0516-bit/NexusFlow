import React, { useMemo, useState } from "react";
import {
  Cpu,
  Wifi,
  Bell,
  Zap,
  ArrowUpRight,
  AlertTriangle,
  ExternalLink,
  Thermometer,
  Droplets,
  Wind,
  Activity,
} from "lucide-react";
import { SensorOverviewChart } from "../../components/Charts/SensorOverviewChart";
import { Sparkline } from "../../components/Charts/Sparkline";
import { TELEMETRY_24H_DATA } from "../../data/mockData";

const cardStyle = {
  padding: 20,
  borderRadius: 14,
  background: "rgba(10, 22, 48, 0.82)",
  border: "1px solid rgba(30, 58, 110, 0.55)",
  minWidth: 0,
};

const emptyStateStyle = {
  padding: 24,
  textAlign: "center",
  color: "#94A3B8",
  background: "rgba(6, 15, 37, 0.55)",
  border: "1px dashed rgba(100, 116, 139, 0.4)",
  borderRadius: 12,
};

const getDeviceIcon = (type) => {
  if (type === "Temperature") return Thermometer;
  if (type === "Humidity") return Droplets;
  if (type === "Air Quality" || type === "Air Quality Sensor") return Wind;
  return Activity;
};

const getSeverityColors = (severity) => {
  if (severity === "critical") {
    return {
      border: "rgba(255, 71, 87, 0.4)",
      background: "rgba(255, 71, 87, 0.16)",
      color: "#FF6472",
    };
  }

  if (severity === "success") {
    return {
      border: "rgba(0, 214, 143, 0.4)",
      background: "rgba(0, 214, 143, 0.16)",
      color: "#00D68F",
    };
  }

  if (severity === "warning") {
    return {
      border: "rgba(255, 176, 32, 0.4)",
      background: "rgba(255, 176, 32, 0.16)",
      color: "#FFB020",
    };
  }

  return {
    border: "rgba(0, 217, 255, 0.4)",
    background: "rgba(0, 217, 255, 0.16)",
    color: "#00D9FF",
  };
};

export const Dashboard = ({
  devices = [],
  alerts = [],
  rules = [],
  setActivePage,
}) => {
  const [timeframe, setTimeframe] = useState("24h");

  const navigate = (page) => {
    if (typeof setActivePage === "function") {
      setActivePage(page);
    }
  };

  const totalDevices = devices.length;

  const onlineDevices = devices.filter(
    (device) => device.status === "online"
  ).length;

  const offlineDevices = totalDevices - onlineDevices;

  const activeRulesCount = rules.filter(
    (rule) => rule.active
  ).length;

  const unreadAlerts = alerts.filter(
    (alert) => !alert.read
  ).length;

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "critical"
  ).length;

  const chartData = useMemo(() => {
    if (timeframe === "12h") {
      return TELEMETRY_24H_DATA.slice(-7);
    }

    return TELEMETRY_24H_DATA;
  }, [timeframe]);

  const metricCards = [
    {
      label: "Devices",
      value: totalDevices,
      detail: `${offlineDevices} offline`,
      icon: Cpu,
      color: "#D0BCFF",
      background:
        "linear-gradient(135deg, rgba(119, 60, 255, 0.22), rgba(14, 18, 48, 0.8))",
      border: "rgba(119, 60, 255, 0.45)",
      page: "devices",
    },
    {
      label: "Online",
      value: onlineDevices,
      detail: `${
        totalDevices
          ? Math.round((onlineDevices / totalDevices) * 100)
          : 0
      }% of devices connected`,
      icon: Wifi,
      color: "#74F4C7",
      background:
        "linear-gradient(135deg, rgba(0, 214, 143, 0.2), rgba(8, 30, 28, 0.8))",
      border: "rgba(0, 214, 143, 0.45)",
      page: "devices",
    },
    {
      label: "Unread Alerts",
      value: unreadAlerts,
      detail: `${criticalAlerts} critical alert${
        criticalAlerts === 1 ? "" : "s"
      }`,
      icon: Bell,
      color: "#FFD074",
      background:
        "linear-gradient(135deg, rgba(255, 176, 32, 0.2), rgba(35, 25, 12, 0.8))",
      border: "rgba(255, 176, 32, 0.45)",
      page: "alerts",
    },
    {
      label: "Active Rules",
      value: activeRulesCount,
      detail: `${rules.length} rules configured`,
      icon: Zap,
      color: "#99EEFF",
      background:
        "linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(8, 25, 45, 0.8))",
      border: "rgba(0, 217, 255, 0.45)",
      page: "automationRules",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        minWidth: 0,
      }}
    >
      <style>{`
        .dashboard-metric-card {
          transition: transform .2s ease, border-color .2s ease;
        }

        .dashboard-metric-card:hover {
          transform: translateY(-3px);
        }

        .dashboard-device-card {
          transition: transform .2s ease, border-color .2s ease;
        }

        .dashboard-device-card:hover {
          border-color: #00D9FF !important;
          transform: translateY(-2px);
        }

        .dashboard-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(280px, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .dashboard-main-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (max-width: 560px) {
          .dashboard-heading {
            font-size: 1.35rem !important;
          }

          .dashboard-legend {
            flex-wrap: wrap;
          }
        }
      `}</style>

      {/* Welcome Section */}

      <section
        className="glass-card"
        style={{
          padding: "24px 28px",
          background:
            "linear-gradient(135deg, rgba(8, 21, 47, 0.9), rgba(14, 31, 71, 0.75))",
          border: "1px solid rgba(0, 217, 255, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h2
            className="dashboard-heading"
            style={{
              fontSize: "1.7rem",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to NexusFlow! 👋
          </h2>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#AAB8D0",
              marginTop: 6,
            }}
          >
            Your IoT control center for device telemetry and rule automation.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <button
            onClick={() => navigate("ruleBuilder")}
            className="btn-primary"
            style={{ padding: "9px 18px" }}
          >
            <Zap size={16} />
            <span>Open Rule Builder</span>
          </button>

          <button
            onClick={() => navigate("telemetry")}
            className="btn-secondary"
            style={{ padding: "9px 16px" }}
          >
            <Activity size={16} color="#00D9FF" />
            <span>View Telemetry</span>
          </button>
        </div>
      </section>

      {/* Metric Cards */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 18,
        }}
      >
        {metricCards.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="glass-card dashboard-metric-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(metric.page)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  navigate(metric.page);
                }
              }}
              style={{
                ...cardStyle,
                background: metric.background,
                border: `1px solid ${metric.border}`,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "2.3rem",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      fontFamily: "var(--font-mono)",
                      lineHeight: 1,
                    }}
                  >
                    {metric.value}
                  </div>

                  <div
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: metric.color,
                      marginTop: 8,
                    }}
                  >
                    {metric.label}
                  </div>
                </div>

                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(0, 0, 0, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} color={metric.color} />
                </div>
              </div>

              <p
                style={{
                  marginTop: 16,
                  fontSize: "0.76rem",
                  color: "#AAB8D0",
                }}
              >
                {metric.detail}
              </p>
            </div>
          );
        })}
      </section>

      {/* Sensor Chart and Recent Alerts */}

      <section className="dashboard-main-grid">
        <div
          className="glass-card"
          style={{ ...cardStyle, padding: 22 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Sensor Data Overview
              </h3>

              <p
                style={{
                  fontSize: "0.76rem",
                  color: "#64748B",
                  marginTop: 4,
                }}
              >
                Demo telemetry history
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div
                className="dashboard-legend"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: "0.78rem",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#E2EDFF",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#00D9FF",
                    }}
                  />
                  Temperature
                </span>

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#E2EDFF",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#9D4EDD",
                    }}
                  />
                  Humidity
                </span>
              </div>

              <select
                aria-label="Select telemetry time range"
                value={timeframe}
                onChange={(event) =>
                  setTimeframe(event.target.value)
                }
                style={{
                  background: "rgba(6, 15, 37, 0.8)",
                  border: "1px solid rgba(30, 58, 110, 0.7)",
                  color: "#00D9FF",
                  borderRadius: 8,
                  padding: "6px 9px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="12h">12h</option>
                <option value="24h">24h</option>
                <option value="7d">7d</option>
              </select>
            </div>
          </div>

          {timeframe === "7d" ? (
            <div style={emptyStateStyle}>
              <Activity
                size={26}
                style={{ marginBottom: 8 }}
              />

              <p>
                7-day telemetry is not available in the current demo dataset.
              </p>

              <p
                style={{
                  fontSize: "0.78rem",
                  marginTop: 6,
                }}
              >
                Choose 12h or 24h to view the available sample data.
              </p>
            </div>
          ) : (
            <SensorOverviewChart
              data={chartData}
              height={250}
            />
          )}

          <p
            style={{
              fontSize: "0.7rem",
              color: "#64748B",
              marginTop: 10,
            }}
          >
            Displayed values use the project's sample telemetry data.
          </p>
        </div>

        {/* Recent Alerts */}

        <div
          className="glass-card"
          style={{ ...cardStyle, padding: 22 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Bell size={18} color="#00D9FF" />

              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Recent Alerts
              </h3>
            </div>

            <button
              onClick={() => navigate("alerts")}
              style={{
                background: "none",
                border: "none",
                color: "#00D9FF",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              View All <ArrowUpRight size={14} />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {alerts.length === 0 ? (
              <div style={emptyStateStyle}>
                <Bell
                  size={24}
                  style={{ marginBottom: 8 }}
                />

                <p>No alerts to display.</p>

                <p
                  style={{
                    fontSize: "0.78rem",
                    marginTop: 6,
                  }}
                >
                  New device alerts will appear here.
                </p>
              </div>
            ) : (
              alerts.slice(0, 4).map((alert) => {
                const colors = getSeverityColors(alert.severity);

                return (
                  <div
                    key={alert.id}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: "rgba(6, 15, 37, 0.65)",
                      border: `1px solid ${colors.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: colors.background,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <AlertTriangle
                          size={16}
                          color={colors.color}
                        />
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.84rem",
                            fontWeight: 600,
                            color: "#FFFFFF",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {alert.title}
                        </div>

                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "#AAB8D0",
                          }}
                        >
                          {alert.location || "Device alert"}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#64748B",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {alert.timestamp || ""}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Live Sensor Readings */}

      <section
        className="glass-card"
        style={{ ...cardStyle, padding: 22 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Live Sensor Readings
            </h3>

            <p
              style={{
                fontSize: "0.76rem",
                color: "#64748B",
                marginTop: 4,
              }}
            >
              Latest readings from the device sample data
            </p>
          </div>

          <button
            onClick={() => navigate("devices")}
            className="btn-secondary"
            style={{
              padding: "6px 14px",
              fontSize: "0.8rem",
            }}
          >
            <span>Manage All Devices</span>
            <ExternalLink size={14} />
          </button>
        </div>

        <div
          style={{
display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 14,
          }}
        >
          {devices.length === 0 ? (
            <div
              style={{
                ...emptyStateStyle,
                gridColumn: "1 / -1",
              }}
            >
              <Cpu
                size={26}
                style={{ marginBottom: 8 }}
              />

              <p>No devices available.</p>

              <p
                style={{
                  fontSize: "0.78rem",
                  marginTop: 6,
                }}
              >
                Add a device to start monitoring sensor data.
              </p>
            </div>
          ) : (
            devices.slice(0, 4).map((device) => {
              const DeviceIcon = getDeviceIcon(device.type);
              const isOnline = device.status === "online";

              return (
                <div
                  key={device.id}
                  className="dashboard-device-card"
                  onClick={() => navigate("devices")}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "rgba(6, 15, 37, 0.7)",
                    border: "1px solid rgba(30, 58, 110, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    cursor: "pointer",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "rgba(0, 217, 255, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <DeviceIcon size={18} color="#00D9FF" />
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "0.84rem",
                          fontWeight: 600,
                          color: "#FFFFFF",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {device.name}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 4,
                          fontSize: "0.7rem",
                          color: "#94A3B8",
                        }}
                      >
                        <span
                          className={`status-dot ${
                            isOnline ? "online" : "offline"
                          }`}
                        />
                        {device.status || "unknown"}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: isOnline ? "#E2EDFF" : "#64748B",
                      }}
                    >
                      {device.value ?? "--"}
                      {device.unit ? ` ${device.unit}` : ""}
                    </div>

                    {Array.isArray(device.sparkline) &&
                    device.sparkline.length > 0 ? (
                      <Sparkline
                        data={device.sparkline}
                        color={isOnline ? "#00D9FF" : "#64748B"}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "#64748B",
                        }}
                      >
                        No trend data
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};            