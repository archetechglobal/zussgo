import { FONTS, COLORS } from "../../constants";
import { ButtonPrimary } from "../ui/Button";
import { scrollToSection } from "../../utils";

export default function Navbar({ scrollY }) {
  const isScrolled = scrollY > 50;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center",
      background: isScrolled ? "rgba(10, 10, 18, 0.85)" : "transparent",
      backdropFilter: isScrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
      borderBottom: isScrolled ? `1px solid ${COLORS.borderDefault}` : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "10px", background: COLORS.gradientPrimary,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", fontWeight: 800, fontFamily: FONTS.display, color: COLORS.textPrimary,
        }}>Z</div>
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.5px" }}>
          ZussGo
        </span>
      </div>
      <ButtonPrimary small onClick={() => scrollToSection("waitlist")}>
        Join Waitlist
      </ButtonPrimary>
    </nav>
  );
}
