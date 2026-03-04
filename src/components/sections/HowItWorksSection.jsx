import { COLORS, FONTS, HOW_IT_WORKS_STEPS } from "../../constants";
import { AnimatedSection, SectionHeading } from "../ui";

export default function HowItWorksSection({ isVisible }) {
  return (
    <AnimatedSection id="how-it-works" isVisible={isVisible}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <SectionHeading
          tag="HOW IT WORKS"
          tagBg={COLORS.mintLight}
          tagColor={COLORS.mint}
          title={<>Three steps to your<br />next adventure</>}
        />
        <div className="grid-3-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.num}
              className="glass-card"
              style={{ padding: "36px 28px", textAlign: "left", transition: "all 0.5s ease", cursor: "default" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{
                fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,107,107,0.4)",
                fontFamily: FONTS.display, marginBottom: "16px", letterSpacing: "2px",
              }}>{step.num}</div>
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{step.icon}</div>
              <h3 style={{
                fontFamily: FONTS.display, fontSize: "1.25rem", fontWeight: 700,
                marginBottom: "12px", letterSpacing: "-0.3px",
              }}>{step.title}</h3>
              <p style={{ color: COLORS.textMuted, fontSize: "0.95rem", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
