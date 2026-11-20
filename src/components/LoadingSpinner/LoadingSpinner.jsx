export function LoadingSpinner({
  message = "Loading...",
  size = 40,
}) {
  return (
    <div style={styles.container} role="status" aria-live="polite">
      <div
        style={{
          ...styles.spinner,
          width: size,
          height: size,
        }}
      />

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "32px 16px",
    width: "100%",
  },

  spinner: {
    border: "4px solid rgba(59, 130, 246, 0.2)",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "nexus-spin 0.8s linear infinite",
    boxSizing: "border-box",
  },

  message: {
    color: "#94a3b8",
    fontSize: "14px",
    margin: 0,
    textAlign: "center",
  },
};