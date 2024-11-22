import { useEffect } from "react";

export const usePreventZoom = () => {
  useEffect(() => {
    const preventDefault = (event: TouchEvent) => {
      if (event.touches && event.touches.length > 1) {
        event.preventDefault();
      }
    };

    const preventGesture = (evetn: Event) => {
      evetn.preventDefault();
    };

    document.addEventListener("touchstart", preventDefault, { passive: false });
    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("gesturestart", preventGesture, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
      document.removeEventListener("gesturestart", preventGesture);
    };
  }, []);
};
