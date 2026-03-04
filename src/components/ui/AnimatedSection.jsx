export default function AnimatedSection({ id, isVisible, style = {}, children }) {
  return (
    <section
      id={id}
      data-animate
      className={isVisible ? "animate-slide-up" : "animate-hidden"}
      style={{ padding: "80px 24px 100px", position: "relative", ...style }}
    >
      {children}
    </section>
  );
}
