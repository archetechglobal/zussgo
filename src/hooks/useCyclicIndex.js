import { useState, useEffect } from "react";

export function useCyclicIndex(itemCount, intervalMs = 3000) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (itemCount <= 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [itemCount, intervalMs]);

  return activeIndex;
}
