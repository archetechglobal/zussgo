import { COLORS, FONTS } from "./constants";
import { useEffect } from "react";
import { useScrollPosition, useSectionVisibility } from "./hooks";
import { Navbar, Footer } from "./components/layout";
import { GrainOverlay, FloatingOrbs } from "./components/ui";
import {
  HeroSection,
  ProblemSection,
  HowItWorksSection,
  DestinationQuizSection,
  TestimonialsSection,
  SoloTravelStatsSection,
  SafetySection,
  WaitlistSection,
} from "./components/sections";

function App() {
  const scrollY = useScrollPosition();
  const isVisible = useSectionVisibility(0.15);
  return (
    <div
      style={{
        background: COLORS.bgPrimary,
        color: COLORS.textPrimary,
        minHeight: "100vh",
        fontFamily: FONTS.body,
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <GrainOverlay />
      <FloatingOrbs />
      <Navbar scrollY={scrollY} />

      <HeroSection />
      <ProblemSection isVisible={isVisible("problem")} />
      <HowItWorksSection isVisible={isVisible("how-it-works")} />
      <DestinationQuizSection isVisible={isVisible("quiz")} />
      <TestimonialsSection isVisible={isVisible("testimonials")} />
      <SoloTravelStatsSection isVisible={isVisible("why-solo")} />
      <SafetySection isVisible={isVisible("safety")} />
      <WaitlistSection isVisible={isVisible("waitlist")} />

      <Footer />
    </div>
  );
}

export default App;
