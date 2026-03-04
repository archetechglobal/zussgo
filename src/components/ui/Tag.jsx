export default function Tag({ children, bgColor, textColor }) {
  return (
    <div style={{
      display: "inline-block", padding: "6px 14px", borderRadius: "50px",
      fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1px",
      textTransform: "uppercase", background: bgColor, color: textColor,
      marginBottom: "16px",
    }}>
      {children}
    </div>
  );
}
