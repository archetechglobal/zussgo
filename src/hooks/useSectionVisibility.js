import { useState, useEffect } from "react";

export function useSectionVisibility(threshold = 0.15) {
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold]);

  return (id) => visibleSections.has(id);
}
