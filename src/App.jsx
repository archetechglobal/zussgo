import { COLORS, FONTS } from "./constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useScrollPosition, useSectionVisibility } from "./hooks";
import { Navbar, Footer } from "./components/layout";
import { GrainOverlay, FloatingOrbs } from "./components/ui";
import AdminDashboard from "./components/sections/AdminDashboard";
import React, { useState } from "react";
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
  const [globalSelectedDest, setGlobalSelectedDest] = useState("");

  return (
    <Router>
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

        <Routes>
          {/* MAIN LANDING PAGE ROUTE */}
          <Route
            path="/"
            element={
              <>
                <Navbar scrollY={scrollY} />
                <HeroSection />
                <ProblemSection isVisible={isVisible("problem")} />
                <HowItWorksSection isVisible={isVisible("how-it-works")} />
                <DestinationQuizSection
                  isVisible={true}
                  setGlobalSelectedDest={setGlobalSelectedDest}
                />
                <TestimonialsSection isVisible={isVisible("testimonials")} />
                <SoloTravelStatsSection isVisible={isVisible("why-solo")} />
                <SafetySection isVisible={isVisible("safety")} />
                <WaitlistSection
                  isVisible={isVisible("waitlist")}
                  globalSelectedDest={globalSelectedDest}
                />
                <Footer />
              </>
            }
          />

          {/* ADMIN DASHBOARD ROUTE */}
          <Route path="/zuss-admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
