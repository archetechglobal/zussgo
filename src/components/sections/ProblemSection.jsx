import { COLORS, FONTS } from "../../constants";
import { AnimatedSection } from "../ui";

export default function ProblemSection({ isVisible }) {
  return (
    <AnimatedSection id="problem" isVisible={isVisible} style={{ padding: "100px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <p style={{
          fontSize: "clamp(1.4rem, 4vw, 2.2rem)", fontFamily: FONTS.display,
          fontWeight: 600, lineHeight: 1.5, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.5px",
        }}>
          You've got the dates. You've got the destination. But your friends?{" "}
          <span style={{ color: "rgba(255,255,255,0.3)" }}>
            They're busy, broke, or "not feeling it."
          </span>
        </p>

        <div style={{
          width: "60px", height: "3px", margin: "40px auto",
          background: COLORS.gradientPrimary, borderRadius: "4px",
        }} />

        <p style={{
          fontSize: "clamp(1.1rem, 3vw, 1.5rem)", fontFamily: FONTS.display,
          fontWeight: 600, lineHeight: 1.6,
          background: COLORS.gradientCoralMint,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          What if someone cool — heading to the SAME place at the SAME time — was looking for exactly what you are?
        </p>
      </div>
    </AnimatedSection>
  );
}
