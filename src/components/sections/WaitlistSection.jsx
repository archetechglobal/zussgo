import { useState } from "react";
import { COLORS, FONTS } from "../../constants";
import { AnimatedSection, ButtonPrimary, ButtonSecondary } from "../ui";
import { isValidEmail, generateWaitlistPosition, shareOrCopy } from "../../utils";

export default function WaitlistSection({ isVisible }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistPos, setWaitlistPos] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setWaitlistPos(generateWaitlistPosition());
    setSubmitted(true);
  };

  return (
    <AnimatedSection id="waitlist" isVisible={isVisible} style={{ padding: "100px 24px 120px", textAlign: "center" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {!submitted ? (
          <>
            <h2 style={{
              fontFamily: FONTS.display, fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 800, marginBottom: "16px", letterSpacing: "-1.5px", lineHeight: 1.1,
            }}>
              Your next trip doesn't<br />have to be{" "}
              <span style={{
                background: COLORS.gradientPrimary,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>alone.</span>
            </h2>

            <p style={{ color: COLORS.textMuted, marginBottom: "36px", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Join the waitlist. Be the first to find your travel match.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{
                  background: COLORS.bgInput, border: `2px solid ${error ? COLORS.coral : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "16px", padding: "18px 24px", color: COLORS.textPrimary,
                  fontSize: "1rem", fontFamily: FONTS.body, width: "100%", maxWidth: "400px",
                  outline: "none", transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.violet;
                  e.target.style.boxShadow = "0 0 20px rgba(123,47,247,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? COLORS.coral : "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <ButtonPrimary onClick={handleSubmit} style={{ padding: "18px 36px" }}>
                Join the Waitlist 🚀
              </ButtonPrimary>
            </div>

            {error && <p style={{ marginTop: "12px", fontSize: "0.85rem", color: COLORS.coral }}>{error}</p>}

            <p style={{ marginTop: "20px", fontSize: "0.8rem", color: COLORS.textSubtle }}>
              No spam. Just adventure updates. Pinky promise 🤙
            </p>
          </>
        ) : (
          <div style={{ animation: "slideUp 0.6s ease" }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🎉</div>
            <h2 style={{
              fontFamily: FONTS.display, fontSize: "2.5rem", fontWeight: 800,
              marginBottom: "12px", letterSpacing: "-1px",
              background: COLORS.gradientMintViolet,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>You're in!</h2>
            <p style={{ fontSize: "1.1rem", color: COLORS.textSecondary, marginBottom: "8px" }}>
              You're <span style={{ color: COLORS.coral, fontWeight: 700 }}>#{waitlistPos}</span> on the waitlist
            </p>
            <p style={{ fontSize: "0.95rem", color: COLORS.textSubtle, marginBottom: "32px" }}>
              Share with friends to skip ahead 👇
            </p>
            <div className="glass-card" style={{
              padding: "24px", maxWidth: "400px", margin: "0 auto",
              background: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(123,47,247,0.08))",
            }}>
              <p style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: "1rem", marginBottom: "16px" }}>
                🌍 I just joined ZussGo — find your travel match!
              </p>
              <ButtonSecondary
                onClick={() => shareOrCopy({ title: "ZussGo", text: "Find your travel match!", url: window.location.href })}
                style={{ padding: "12px 28px", fontSize: "0.85rem" }}
              >
                Share & Skip Ahead
              </ButtonSecondary>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
