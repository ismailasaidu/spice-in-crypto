import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ trigger }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Wait until trigger is true, then scroll
    if (trigger) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, trigger]);

  return null;
};

export default ScrollToTop;
