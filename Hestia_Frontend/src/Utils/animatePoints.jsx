import { useEffect, useState } from "react";

export function useAnimatedNumber(target, duration = 1000) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const start = display;
    const change = target - start;
    const steps = Math.round(duration / 16); // ~60fps
    let currentStep = 0;

    const animate = () => {
      currentStep++;
      const progress = currentStep / steps;
      const currentValue = Math.round(start + change * progress);
      setDisplay(currentValue);

      if (currentStep < steps) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [target]);

  return display;
}
