import { COLORS, FONTS, LIVE_MATCHES, WAITLIST_COUNT, MATCH_TICKER_INTERVAL_MS } from "../../constants";
import { ButtonPrimary, ButtonSecondary } from "../ui/Button";
import { useCyclicIndex } from "../../hooks";
import { scrollToSection } from "../../utils";

export default function HeroSection() {
  const activeMatch = useCyclicIndex(LIVE_MATCHES.length, MATCH_TICKER_INTERVAL_MS);
  const match = LIVE_MATCHES[activeMatch];

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "120px 24px 60px", position: "relative",
    }}>
      <div style={{ animation: "slideUp 1s ease forwards", maxWidth: "800px" }}>
        <div style={{
          display: "inline-block", padding: "6px 14px", borderRadius: "50px",
          fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase",
          background: COLORS.violetLight, color: COLORS.violetSoft, marginBottom: "24px",
        }}>
          ✨ YOUR NEXT ADVENTURE STARTS HERE
        </div>

        <h1 style={{
          fontFamily: FONTS.display, fontWeight: 800,
          fontSize: "clamp(2.8rem, 8vw, 5.5rem)", lineHeight: 1.05,
          letterSpacing: "-2px", marginBottom: "24px",
          background: COLORS.gradientHero, backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "gradientMove 6s ease infinite",
        }}>
          Solo trip.<br />Shared vibes.
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: COLORS.textSecondary,
          maxWidth: "520px", margin: "0 auto 40px", lineHeight: 1.7,
        }}>
          Find real travelers heading to your destination, on your dates. Match. Chat. Go together.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <ButtonPrimary onClick={() => scrollToSection("quiz")}>Find Your Travel Match →</ButtonPrimary>
          <ButtonSecondary onClick={() => scrollToSection("how-it-works")}>How It Works</ButtonSecondary>
        </div>

        <p style={{ marginTop: "28px", fontSize: "0.85rem", color: COLORS.textSubtle }}>
          🔥 {WAITLIST_COUNT.toLocaleString()}+ travelers already on the waitlist
        </p>
      </div>

      {/* Live match ticker */}
      <div style={{ position: "absolute", bottom: "40px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: COLORS.mint,
          boxShadow: `0 0 10px ${COLORS.mint}`,
        }} />
        <div className="animate-ticker" key={activeMatch} style={{ fontSize: "0.9rem", color: COLORS.textSecondary }}>
          <span style={{ color: COLORS.coral }}>{match.a}</span>
          {" matched with "}
          <span style={{ color: COLORS.violet }}>{match.b}</span>
          {" for "}
          <span style={{ color: COLORS.mint }}>{match.dest}</span>
          {" • "}{match.time}
        </div>
      </div>
    </section>
  );
}
