import { COLORS, TESTIMONIALS } from "../../constants";
import { AnimatedSection, SectionHeading } from "../ui";

export default function TestimonialsSection({ isVisible }) {
  return (
    <AnimatedSection id="testimonials" isVisible={isVisible}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <SectionHeading
          tag="REAL STORIES"
          tagBg={COLORS.orangeLight}
          tagColor={COLORS.orange}
          title={<>Strangers today.<br />Travel buddies forever.</>}
        />
        <div className="grid-3-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ padding: "32px 24px", textAlign: "left", transition: "all 0.4s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: "rgba(255,255,255,0.06)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "20px",
              }}>{t.avatar}</div>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: "20px", fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: COLORS.textMuted }}>— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
