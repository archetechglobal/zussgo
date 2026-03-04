import { COLORS, SAFETY_FEATURES } from "../../constants";
import { AnimatedSection, SectionHeading } from "../ui";

export default function SafetySection({ isVisible }) {
  return (
    <AnimatedSection id="safety" isVisible={isVisible}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <SectionHeading
          tag="🛡️ YOUR SAFETY"
          tagBg={COLORS.mintLight}
          tagColor={COLORS.mint}
          title="We've got your back"
        />
        <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {SAFETY_FEATURES.map((f, i) => (
            <div key={i} className="glass-card" style={{
              padding: "20px 24px", textAlign: "left", display: "flex", alignItems: "center", gap: "14px",
            }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px", background: COLORS.mintLight,
                color: COLORS.mint, display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.85rem", flexShrink: 0,
              }}>{f.icon}</div>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem" }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
