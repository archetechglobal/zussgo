const ORBS = [
  { color: "#FF6B6B", size: "400px", top: "-100px", left: "-100px", delay: 0 },
  { color: "#7B2FF7", size: "350px", top: "200px", left: "70%", delay: 2 },
  { color: "#00F5D4", size: "300px", top: "60%", left: "10%", delay: 4 },
  { color: "#FF8E53", size: "250px", top: "80%", left: "80%", delay: 1 },
];

export default function FloatingOrbs() {
  return (
    <>
      {ORBS.map((orb, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute", top: orb.top, left: orb.left,
            width: orb.size, height: orb.size, background: orb.color,
            borderRadius: "50%", filter: "blur(80px)", opacity: 0.15,
            animation: `orbFloat 8s ease-in-out ${orb.delay}s infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
