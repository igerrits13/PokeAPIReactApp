import { useState, useEffect } from "react";
import { motion } from "motion/react";

// Popup button to allow user to scroll to top of the current page on click
const ScrollToTop = ({ isDarkMode }) => {
  // Setup the font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Use state to track if the button should be visible and if it is being hovered on
  const [showIcon, setShowIcon] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // If the user scrolls so far down, display the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1.5) {
        if (!showIcon) setShowIcon(true);
      } else {
        if (showIcon) setShowIcon(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showIcon]);

  // Display the scroll to top button, keep track of the state for if the button is hovered or not
  // and add an animation for appearing and if it is hovered
  return (
    <motion.i
      className={`fa-regular fa-circle-up scroll-top-icon ${fontStyle} ${
        showIcon ? "scroll-top-icon-active" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.scrollTo(0, 0)}
      animate={{
        scale: showIcon ? 1 : 0,
        opacity: showIcon ? 1 : 0,
        height: isHovered ? ["1.5rem", "2rem", "1.5rem"] : "1.5rem",
      }}
      transition={{
        scale: { duration: 0.3, type: "spring", stiffness: 300 },
        opacity: { duration: 0.3 },
        height: {
          duration: 0.8,
          type: "tween",
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 0.2,
        },
      }}
    />
  );
};

export default ScrollToTop;
