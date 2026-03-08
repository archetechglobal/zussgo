import React, { useState, useEffect } from "react";
import { COLORS, FONTS } from "../../constants";
import { AnimatedSection, ButtonPrimary, ButtonSecondary } from "../ui";
import { isValidEmail, shareOrCopy, scrollToSection } from "../../utils";
import confetti from "canvas-confetti";

export default function WaitlistSection({ isVisible, globalSelectedDest }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistPos, setWaitlistPos] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. AUTO-CLEAR: Remove the error message as soon as they pick a destination
  // This is wrapped in useEffect to prevent infinite render loops.
  useEffect(() => {
    if (globalSelectedDest && error === "SELECT_DESTINATION") {
      setError("");
    }
  }, [globalSelectedDest, error]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");

    // Validation 1: Email check
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validation 2: Destination check
    if (!globalSelectedDest) {
      setError("SELECT_DESTINATION");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://tkzdwtszdefpfonjlwrw.supabase.co/functions/v1/join-waitlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.toLowerCase(),
            destination: globalSelectedDest,
          }),
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
                alone.
              </span>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              {/* STATUS AREA: Only shows ONE message/button at a time */}
              {error === "SELECT_DESTINATION" ? (
                <div
                  style={{
                    marginBottom: "20px",
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      color: COLORS.coral,
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    ⚠️ Please pick a destination first!
                  </p>
                  <ButtonSecondary
                    onClick={() => scrollToSection("quiz")}
                    style={{
                      fontSize: "0.85rem",
                      padding: "10px 20px",
                      border: `1px solid ${COLORS.coral}`,
                      color: COLORS.coral,
                    }}
                  >
                    🗺️ Select a Destination
                  </ButtonSecondary>
                </div>
              ) : globalSelectedDest ? (
                <p
                  style={{
                    color: COLORS.mint,
                    fontSize: "0.95rem",
                    marginBottom: "15px",
                    fontWeight: 600,
                  }}
                >
                  Ready for your trip to {globalSelectedDest}? ✈️
                </p>
              ) : (
                <p
                  style={{
                    color: COLORS.textMuted,
                    marginBottom: "36px",
                    fontSize: "1.05rem",
                  }}
                >
                  Join the waitlist. Be the first to find your travel match.
                </p>
              )}

              {/* INPUT FORM */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  style={{
                    background: COLORS.bgInput,
                    border: `2px solid ${error && !["ALREADY_JOINED", "SELECT_DESTINATION"].includes(error) ? COLORS.coral : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "16px",
                    padding: "18px 24px",
                    color: COLORS.textPrimary,
                    width: "100%",
                    maxWidth: "400px",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                />
                <ButtonPrimary onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Joining..." : "Join the Waitlist 🚀"}
                </ButtonPrimary>
              </div>
            </div>

            {/* ERROR MESSAGES */}
            {error === "ALREADY_JOINED" && (
              <div
                style={{
                  marginTop: "30px",
                  padding: "20px",
                  background: "rgba(123, 47, 247, 0.08)",
                  border: `1px solid ${COLORS.violet}`,
                  borderRadius: "16px",
                  boxShadow: `0 0 20px rgba(123, 47, 247, 0.2)`,
                }}
              >
                <p style={{ margin: 0, color: COLORS.textPrimary }}>
                  You're already on the list, explorer! We'll reach out soon.
                </p>
              </div>
            )}

            {/* Standard Error (Excludes the SELECT_DESTINATION text from appearing at bottom) */}
            {error &&
              !["ALREADY_JOINED", "SELECT_DESTINATION"].includes(error) && (
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
              No spam. Just adventure updates. Pinky promise 🤙
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
              }}
            >
              You're in!
            </h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
              You're{" "}
              <span style={{ color: COLORS.coral, fontWeight: 700 }}>
                #{waitlistPos}
              </span>{" "}
              on the waitlist
            </p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
