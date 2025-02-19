import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const NavButtonPrev = ({ id }) => {
  const navigate = useNavigate();

  const navPrev = () => {
    navigate(`/pokemon/${id}`);
  };

  // Function to handle image error and hide the parent div
  const handleImageError = (e) => {
    e.target(".dyn-section-button-img-container").style.display = "none";
  };

  return (
    id > 0 && (
      <div className="">
        <motion.button
          className={`nav-button-prev 
          `}
          onClick={() => navPrev()}
          whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
          whileTap={{ scale: 0.9, rotate: "5deg" }}
          transition={{ duration: 0.1 }}
          //  ${fontStyle} ${infoButtonStyle} ${inactiveButtonStyle}
        >
          #{id}
          <div className="dyn-section-button-img-container">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={`Test`}
              className="dyn-section-button-full-img"
              onError={handleImageError} // Add error handling
            />
          </div>
        </motion.button>
      </div>
    )
  );
};

export default NavButtonPrev;
