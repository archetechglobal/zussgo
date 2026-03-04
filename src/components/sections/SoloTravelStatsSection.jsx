import { COLORS, FONTS, SOLO_TRAVEL_STATS } from "../../constants";
import { AnimatedSection, SectionHeading } from "../ui";

export default function SoloTravelStatsSection({ isVisible }) {
  return (
    <AnimatedSection
      id="why-solo"
      isVisible={isVisible}
      style={{ background: "linear-gradient(180deg, transparent, rgba(0,245,212,0.02), transparent)" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <SectionHeading
          tag="📊 THE SOLO WAVE"
          tagBg={COLORS.violetLight}
          tagColor={COLORS.violetSoft}
          title={<>Solo travel isn't lonely.<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>It's a power move.</span></>}
        />
        <div className="grid-3-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {SOLO_TRAVEL_STATS.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: "36px 24px" }}>
              <div style={{
                fontFamily: FONTS.display, fontSize: "2.8rem", fontWeight: 800,
                color: s.color, marginBottom: "8px", letterSpacing: "-1px",
              }}>{s.stat}</div>
              <p style={{ color: COLORS.textMuted, fontSize: "0.9rem", lineHeight: 1.6 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
