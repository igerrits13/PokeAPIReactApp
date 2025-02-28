import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

// Display the varieties that the current Pokémon has, collapsing them to a dropdown if there are 5 or more
const FormsInfoVarieties = ({
  pokeData,
  pokeSpeciesData,
  setPokeId,
  isDarkMode,
}) => {
  // Setup the page font and alternate forms butons based on if tthe user is using dark mode or not
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const inactiveButtonStyle = isDarkMode
    ? "option-font-dark"
    : "option-font-light";
  const formsButtonStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";
  const formsResultStyle = isDarkMode
    ? "component-background-dark component-outline-dark-no-side"
    : "component-background-light component-outline-light-no-side";

  // Create state and refs to track when the varieties dropdown should be displayed
  const [isActiveVarietiesDropdown, setIsActiveVarietiesDropdown] =
    useState(false);
  const varietiesDropdownRef = useRef(null);
  const varietiesButtonRef = useRef(null);

  // Close dropdown if user clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        varietiesDropdownRef.current &&
        !varietiesDropdownRef.current.contains(event.target) &&
        varietiesButtonRef.current &&
        !varietiesButtonRef.current.contains(event.target)
      ) {
        varietiesDropdownRef.current.scrollTop = 0;
        setIsActiveVarietiesDropdown(false);
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
  const getPokeNum = (url) => {
    const urlSections = url.split("/");
    const cleanSection = urlSections.filter((section) => section !== "");
    const endSection = cleanSection[cleanSection.length - 1];
    const urlNum = parseInt(endSection, 10);
    const isDisabled = urlNum === pokeData.id;
    return [urlNum, isDisabled];
  };

  // Update pokeID when a new variation is selected
  const handleChangePokemon = (pokeNum) => {
    setPokeId(pokeNum);
  };

  // If an image does not exist, hide the prarent div box to allow the name text to cover the entire button
  const handleImageError = (e) => {
    e.target.closest(".dyn-section-button-img-container").style.display =
      "none";
  };

  // Display for the varieties buttons or dropdowns
  return (
    <div className="dyn-section-button-container">
      {pokeSpeciesData.varieties.length < 5 ? (
        pokeSpeciesData.varieties.map((obj, i) => {
          const [pokeNum, isDisabled] = getPokeNum(obj.pokemon.url);

          return (
            <motion.button
              className={`dyn-section-button ${fontStyle} ${formsButtonStyle} ${
                isDisabled ? inactiveButtonStyle : ""
              }`}
              key={i}
              onClick={() => handleChangePokemon(pokeNum)}
              disabled={isDisabled}
              whileHover={
                !isDisabled ? { scale: 1.1, rotate: "-1.5deg" } : undefined
              }
              whileTap={
                !isDisabled ? { scale: 0.9, rotate: "5deg" } : undefined
              }
              transition={!isDisabled ? { duration: 0.1 } : undefined}
            >
              {getPokeName(obj.pokemon.name)}
              <div className="dyn-section-button-img-container">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNum}.png`}
                  alt={`${obj.pokemon.name}`}
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
            className={`dyn-section-dropdown-button ${fontStyle} ${formsButtonStyle}`}
            onClick={() =>
              setIsActiveVarietiesDropdown(!isActiveVarietiesDropdown)
            }
            ref={varietiesButtonRef}
          >
            <div className="dyn-section-dropdown-text">Varieties</div>
            <motion.i
              className="fa-solid fa-circle-chevron-down"
              animate={{
                rotate: isActiveVarietiesDropdown ? -180 : 0,
              }}
              transition={{ duration: 0.2 }}
            ></motion.i>
          </button>
          <div
            className={`dyn-section-dropdown-results ${formsResultStyle} ${
              isActiveVarietiesDropdown
                ? "dyn-section-dropdown-results-active"
                : ""
            }`}
            ref={varietiesDropdownRef}
          >
            {pokeSpeciesData.varieties.map((obj, i) => {
              const [pokeNum, isDisabled] = getPokeNum(obj.pokemon.url);

              return (
                <motion.button
                  className={`dyn-section-dropdown-items ${fontStyle} ${formsButtonStyle} ${
                    isDisabled ? inactiveButtonStyle : ""
                  }`}
                  key={i}
                  onClick={() => handleChangePokemon(pokeNum)}
                  disabled={isDisabled}
                  whileHover={!isDisabled ? { scale: 1.1 } : undefined}
                  whileTap={!isDisabled ? { scale: 0.9 } : undefined}
                  transition={!isDisabled ? { duration: 0.1 } : undefined}
                >
                  {getPokeName(obj.pokemon.name)}
                  <div className="dyn-section-button-img-container">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNum}.png`}
                      alt={`${obj.pokemon.name}`}
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

export default FormsInfoVarieties;
