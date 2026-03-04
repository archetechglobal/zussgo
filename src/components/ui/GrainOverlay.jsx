export default function GrainOverlay() {
  return (
    <svg
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 9999, opacity: 0.03,
      }}
      aria-hidden="true"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
