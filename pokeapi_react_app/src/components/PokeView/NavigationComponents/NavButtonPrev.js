import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

// Button display to navigate to the previous Pokémon
const NavButtonPrev = ({ fullPokeResults, id, isDarkMode }) => {
  // Setup the navigation button style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const navButtonStyle = isDarkMode
    ? "searchbar-font-dark component-background-dark component-outline-dark"
    : "searchbar-font-light component-background-light component-outline-light";
  const navButtondetailStyle = isDarkMode
    ? "stats-progress-dark-min"
    : "stats-progress-light-min";

  // State showing if the button is currently hovered and variable to allow navigation
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Function to handle image error and hide the parent div
  const handleImageError = (e) => {
    e.target(".dyn-section-button-img-container").style.display = "none";
  };

  // Display the previous button if the previous ID is valid
  return (
    id > 0 && (
      <motion.button
        className={`nav-button nav-button-prev ${navButtonStyle}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/pokemon/${id}`)}
        whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
        whileTap={{ scale: 0.9, rotate: "5deg" }}
        transition={{ duration: 0.1 }}
      >
        <div
          className={`nav-button-detail nav-button-prev-detail ${navButtondetailStyle}`}
        ></div>
        <div className={`nav-button-icon-container ${fontStyle}`}>
          <motion.i
            className={`fa-solid fa-angles-left nav-button-icon ${fontStyle}`}
            animate={{
              x: isHovered ? [0, -10, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              type: "tween",
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.2,
            }}
          />
          {getPokeName(fullPokeResults[id - 1].name)} #{id}
        </div>
        <motion.img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={`Test`}
          className="nav-button-img"
          onError={handleImageError}
          animate={{
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.button>
    )
  );
};

export default NavButtonPrev;
