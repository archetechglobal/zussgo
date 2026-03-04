import { useState } from "react";
import { COLORS, FONTS, DESTINATIONS } from "../../constants";
import { AnimatedSection, SectionHeading, ButtonPrimary } from "../ui";
import { scrollToSection } from "../../utils";

export default function DestinationQuizSection({ isVisible }) {
  const [selectedDest, setSelectedDest] = useState(null);

  return (
    <AnimatedSection
      id="quiz"
      isVisible={isVisible}
      style={{ background: "linear-gradient(180deg, transparent, rgba(123,47,247,0.03), transparent)" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <SectionHeading
          tag="🗺️ TRY IT OUT"
          tagBg={COLORS.coralLight}
          tagColor={COLORS.coral}
          title="Where are you going next?"
          subtitle="Pick a destination and see who's already heading there"
        />

        <div
          className="dest-grid-responsive"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px" }}
        >
          {DESTINATIONS.map((dest, i) => (
            <div
              key={dest.name}
              onClick={() => setSelectedDest(i)}
              style={{
                borderRadius: "16px", padding: "24px", cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                position: "relative", overflow: "hidden", background: dest.gradient,
                border: selectedDest === i ? `2px solid ${COLORS.mint}` : "2px solid transparent",
                boxShadow: selectedDest === i ? "0 0 30px rgba(0,245,212,0.2)" : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = selectedDest === i ? "0 0 30px rgba(0,245,212,0.2)" : "none";
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", borderRadius: "14px" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{dest.emoji}</div>
                <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: "1.15rem", marginBottom: "4px" }}>
                  {dest.name}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.mint, display: "inline-block" }} />
                  {dest.count} travelers heading here
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedDest !== null && (
          <div className="glass-card" style={{ padding: "32px", maxWidth: "500px", margin: "0 auto", animation: "slideUp 0.5s ease" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{DESTINATIONS[selectedDest].emoji}</div>
            <p style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: "1.2rem", marginBottom: "4px" }}>
              <span style={{ color: COLORS.mint }}>{DESTINATIONS[selectedDest].count} people</span> are heading to {DESTINATIONS[selectedDest].name}
            </p>
            <p style={{ color: COLORS.textMuted, fontSize: "0.9rem", marginBottom: "24px" }}>
              Sign up to see who they are and connect 👇
            </p>
            <ButtonPrimary style={{ fontSize: "0.95rem", padding: "14px 32px" }} onClick={() => scrollToSection("waitlist")}>
              Show Me My Matches
            </ButtonPrimary>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
