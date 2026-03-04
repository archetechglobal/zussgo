import { COLORS, FONTS } from "../../constants";

export default function Footer() {
  return (
    <footer style={{
      padding: "40px 24px", borderTop: `1px solid ${COLORS.borderDefault}`, textAlign: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
        <div style={{
          width: 28, height: 28, borderRadius: "8px", background: COLORS.gradientPrimary,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.85rem", fontWeight: 800, fontFamily: FONTS.display,
        }}>Z</div>
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: "1rem" }}>ZussGo</span>
      </div>
      <p style={{ color: COLORS.textFaint, fontSize: "0.8rem" }}>Solo trip. Shared vibes. © 2026</p>
    </footer>
  );
}
