import { useState, useEffect } from "react";

const useAnimatedCounter = (endValue, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!endValue) return;

    let startTimestamp;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * endValue));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return count;
};

export default useAnimatedCounter;
