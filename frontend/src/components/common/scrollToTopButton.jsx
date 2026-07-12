import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import useScrollToTop from "../../hooks/useScrollToTop"; // Adjust path to your hook

const ScrollToTopButton = () => {
  const { scrollToTop } = useScrollToTop();
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide floating button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={scrollToTop}
          className="
            fixed
            bottom-6
            right-6
            z-50
            p-3
            rounded-full
            bg-[#15157d]
            text-white
            shadow-xl
            border
            border-white/10
            hover:bg-[#cca730]
            hover:text-[#15157d]
            hover:scale-110
            transition-colors
            duration-300
            cursor-pointer
            focus:outline-none
          "
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;