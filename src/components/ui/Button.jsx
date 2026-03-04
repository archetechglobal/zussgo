import { COLORS, FONTS, SPACING } from "../../constants";

export function ButtonPrimary({ children, onClick, style = {}, small = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: COLORS.gradientPrimary, color: "white", border: "none",
        padding: small ? "10px 24px" : "18px 42px",
        borderRadius: SPACING.buttonRadius,
        fontSize: small ? "0.85rem" : "1.1rem",
        fontWeight: 700, fontFamily: FONTS.body, cursor: "pointer",
        animation: small ? "none" : "pulse 3s ease-in-out infinite",
        transition: "all 0.3s ease", letterSpacing: "0.5px", ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.animation = "none";
        e.currentTarget.style.boxShadow = "0 0 50px rgba(255,107,107,0.5), 0 0 80px rgba(123,47,247,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        if (!small) e.currentTarget.style.animation = "pulse 3s ease-in-out infinite";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
}

export function ButtonSecondary({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent", color: COLORS.coral,
        border: `2px solid ${COLORS.coralGlow}`,
        padding: "16px 38px", borderRadius: SPACING.buttonRadius,
        fontSize: "1rem", fontWeight: 600, fontFamily: FONTS.body,
        cursor: "pointer", transition: "all 0.3s ease",
        animation: "borderGlow 3s ease-in-out infinite", ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,107,107,0.1)";
        e.currentTarget.style.borderColor = COLORS.coral;
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = COLORS.coralGlow;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}
