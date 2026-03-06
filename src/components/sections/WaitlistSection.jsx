import { useState } from "react";
import { COLORS, FONTS } from "../../constants";
import { AnimatedSection, ButtonPrimary, ButtonSecondary } from "../ui";
import { isValidEmail, shareOrCopy } from "../../utils";
import confetti from "canvas-confetti";

export default function WaitlistSection({ isVisible }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistPos, setWaitlistPos] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://tkzdwtszdefpfonjlwrw.supabase.co/functions/v1/join-waitlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.toLowerCase() }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setWaitlistPos(data.count);
        setSubmitted(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#7B2FF7", "#F15A24", "#ffffff"],
        });
      } else if (response.status === 409) {
        // This triggers the specialized UI block below
        setError("ALREADY_JOINED");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Connection error. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedSection
      id="waitlist"
      isVisible={isVisible}
      style={{ padding: "100px 24px 120px", textAlign: "center" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {!submitted ? (
          <>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 800,
                marginBottom: "16px",
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
              }}
            >
              Your next trip doesn't <br /> have to be{" "}
              <span
                style={{
                  background: COLORS.gradientPrimary,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {" "}
                alone.{" "}
              </span>
            </h2>

            <p
              style={{
                color: COLORS.textMuted,
                marginBottom: "36px",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              Join the waitlist. Be the first to find your travel match.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{
                  background: COLORS.bgInput,
                  border: `2px solid ${error && error !== "ALREADY_JOINED" ? COLORS.coral : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "16px",
                  padding: "18px 24px",
                  color: COLORS.textPrimary,
                  fontSize: "1rem",
                  fontFamily: FONTS.body,
                  width: "100%",
                  maxWidth: "400px",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
              />
              <ButtonPrimary
                onClick={handleSubmit}
                disabled={isLoading}
                style={{ padding: "18px 36px" }}
              >
                {isLoading ? "Joining..." : "Join the Waitlist 🚀"}
              </ButtonPrimary>
            </div>

            {/* RESTORED: Glowing Already Joined UI */}
            {error === "ALREADY_JOINED" && (
              <div
                style={{
                  marginTop: "30px",
                  padding: "20px",
                  background: "rgba(123, 47, 247, 0.08)",
                  border: `1px solid ${COLORS.violet}`,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  justifyContent: "center",
                  animation: "fadeIn 0.6s ease",
                  boxShadow: `0 0 20px rgba(123, 47, 247, 0.2)`, // Added the Glow
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>👋</span>
                <p
                  style={{
                    margin: 0,
                    color: COLORS.textPrimary,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    textAlign: "left",
                  }}
                >
                  You're already on the list, explorer! <br />
                  <span
                    style={{ color: COLORS.textSubtle, fontSize: "0.85rem" }}
                  >
                    We'll reach out as soon as a match is found.
                  </span>
                </p>
              </div>
            )}

            {/* Standard Error Message */}
            {error && error !== "ALREADY_JOINED" && (
              <p
                style={{
                  color: COLORS.coral,
                  marginTop: "12px",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </p>
            )}

            <p
              style={{
                marginTop: "20px",
                fontSize: "0.8rem",
                color: COLORS.textSubtle,
              }}
            >
              {" "}
              No spam. Just adventure updates. Pinky promise 🤙{" "}
            </p>
          </>
        ) : (
          <div style={{ animation: "slideUp 0.6s ease" }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🎉</div>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "2.5rem",
                fontWeight: 800,
                marginBottom: "12px",
                background: COLORS.gradientMintViolet,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              You're in!
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: COLORS.textSecondary,
                marginBottom: "8px",
              }}
            >
              You're{" "}
              <span style={{ color: COLORS.coral, fontWeight: 700 }}>
                #{waitlistPos}
              </span>{" "}
              on the waitlist
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: COLORS.textSubtle,
                marginBottom: "32px",
              }}
            >
              {" "}
              Share with friends to skip ahead 👇{" "}
            </p>
            <div
              className="glass-card"
              style={{
                padding: "24px",
                maxWidth: "400px",
                margin: "0 auto",
                background:
                  "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(123,47,247,0.08))",
              }}
            >
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "16px",
                }}
              >
                {" "}
                🌍 I just joined ZussGo — find your travel match!{" "}
              </p>
              <ButtonSecondary
                onClick={() =>
                  shareOrCopy({
                    title: "ZussGo",
                    text: "Find your travel match!",
                    url: window.location.href,
                  })
                }
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
