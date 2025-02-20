import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

// Display the forms that the current Pokémon has, collapsing them to a dropdown if there are 5 or more
const FormsInfoForms = ({ pokeData, isDarkMode }) => {
  // Setup the page font and alternate forms butons based on if tthe user is using dark mode or not
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const infoButtonStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";
  const inactiveButtonStyle = isDarkMode
    ? "option-font-dark"
    : "option-font-light";
  const formsResultsStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";

  // Create state and refs to track when the varieties dropdown should be displayed
  const [isActiveFormsDropdown, setIsActiveFormsDropdown] = useState(false);
  const formssDropdownRef = useRef(null);
  const formsButtonRef = useRef(null);

  // Close dropdown if user clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formssDropdownRef.current &&
        !formssDropdownRef.current.contains(event.target) &&
        formsButtonRef.current &&
        !formsButtonRef.current.contains(event.target)
      ) {
        formssDropdownRef.current.scrollTop = 0;
        setIsActiveFormsDropdown(false);
      }
    };

    // Listen for clicks on the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });
    return formattedName.join(" ");
  };

  // Get the number of the current Pokémon based on its url
  const getPokeNum = (obj) => {
    const urlSections = obj.url.split("/");
    const cleanSection = urlSections.filter((section) => section !== "");
    const endSection = cleanSection[cleanSection.length - 1];
    const urlNum = parseInt(endSection, 10);
    const formName = obj.name.split("-");
    return [urlNum, formName];
  };

  // If an image does not exist, hide the prarent div box to allow the name text to cover the entire button
  const handleImageError = (e) => {
    e.target.closest(".dyn-section-button-img-container").style.display =
      "none";
  };

  // Display for the forms buttons or dropdowns
  return (
    <div className="dyn-section-button-container">
      {pokeData.forms.length < 5 ? (
        pokeData.forms.map((obj, i) => {
          const [pokenum, formName] = getPokeNum(obj);

          return (
            <motion.button
              className={`dyn-section-button ${fontStyle} ${infoButtonStyle} ${inactiveButtonStyle}`}
              key={i}
              disabled
            >
              {getPokeName(obj.name)}
              <div className="dyn-section-button-img-container">
                <img
                  src={
                    pokenum === pokeData.id || i === 0
                      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`
                      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}-${formName[1]}.png`
                  }
                  alt={`${obj.name}`}
                  className="dyn-section-button-full-img"
                  onError={handleImageError}
                />
              </div>
            </motion.button>
          );
        })
      ) : (
        <div className="dyn-section-dropdown-container">
          <button
            className={`dyn-section-dropdown-button ${fontStyle} ${infoButtonStyle}`}
            onClick={() => setIsActiveFormsDropdown(!isActiveFormsDropdown)}
            ref={formsButtonRef}
          >
            <div className="dyn-section-dropdown-text">Forms</div>
            <motion.i
              className="fa-solid fa-circle-chevron-down"
              animate={{
                rotate: isActiveFormsDropdown ? -180 : 0,
              }}
              transition={{ duration: 0.2 }}
            ></motion.i>
          </button>
          <div
            className={`dyn-section-dropdown-results ${formsResultsStyle} ${
              isActiveFormsDropdown ? "dyn-section-dropdown-results-active" : ""
            }`}
            ref={formssDropdownRef}
          >
            {pokeData.forms.map((obj, i) => {
              const [pokeNum, formName] = getPokeNum(obj);

              return (
                <motion.button
                  className={`dyn-section-dropdown-items ${fontStyle} ${infoButtonStyle} ${inactiveButtonStyle}`}
                  key={i}
                  disabled
                >
                  {getPokeName(obj.name)}
                  <div className="dyn-section-button-img-container">
                    <img
                      src={
                        pokeNum === pokeData.id || i === 0
                          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`
                          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}-${formName[1]}.png`
                      }
                      alt={`${obj.name}`}
                      className="dyn-section-button-full-img"
                      onError={handleImageError}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormsInfoForms;
