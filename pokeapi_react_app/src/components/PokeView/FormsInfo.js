import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import DynamicTableSection from "../CommonComponents/DynamicTableSection";

// Forms information section for the current Pokémon
const FormsInfo = ({
  pokeData,
  setPokeId,
  pokeSpeciesData,
  screenSize,
  isDarkMode,
}) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size, as well as
  // the active and inactive buton styles based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";
  const infoButtonStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";
  const inactiveButtonStyle = isDarkMode
    ? "option-font-dark clean-border"
    : "option-font-light clean-border";
  const formsResultsStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";

  const [isActiveFormsDropdown, setIsActiveFormsDropdown] = useState(false);
  const formssDropdownRef = useRef(null);
  const formsButtonRef = useRef(null);
  const [isActiveVarietiesDropdown, setIsActiveVarietiesDropdown] =
    useState(false);
  const varietiesDropdownRef = useRef(null);
  const varietiesButtonRef = useRef(null);

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });
    return formattedName.join(" ");
  };

  // Update pokeID when a new variation is selected
  const handleChangePokemon = (pokeNum) => {
    setPokeId(pokeNum);
  };

  // Close dropdown if click is outside of the dropdown or button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formssDropdownRef.current &&
        !formssDropdownRef.current.contains(event.target) &&
        formsButtonRef.current &&
        !formsButtonRef.current.contains(event.target)
      ) {
        formssDropdownRef.current.scrollTop = 0;
        setIsActiveFormsDropdown(false); // Close dropdown if click is outside
      }
      if (
        varietiesDropdownRef.current &&
        !varietiesDropdownRef.current.contains(event.target) &&
        varietiesButtonRef.current &&
        !varietiesButtonRef.current.contains(event.target)
      ) {
        varietiesDropdownRef.current.scrollTop = 0;
        setIsActiveVarietiesDropdown(false); // Close dropdown if click is outside
      }
    };

    // Listen for clicks on the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Data structure to store the forms information for the current Pokémon
  const formInfo = [
    {
      text: "Default Form",
      info: pokeData.is_default === true ? "True" : "False",
      id: 0,
    },
    {
      text: "Alternate Forms",
      info: (
        <div className="dyn-section-button-container">
          {pokeData.forms.length < 5 ? (
            pokeData.forms.map((obj, i) => {
              // Extract the Pokémon number from the Pokémon URL
              const parts = obj.url.split("/");
              const cleanedParts = parts.filter((part) => part !== "");
              const lastPart = cleanedParts[cleanedParts.length - 1];
              const number = parseInt(lastPart, 10);
              const formName = obj.name.split("-");
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
                        number === pokeData.id || i === 0
                          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`
                          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}-${formName[1]}.png`
                      }
                      alt={`${obj.name}`}
                      className="dyn-section-button-full-img"
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
                  isActiveFormsDropdown
                    ? "dyn-section-dropdown-results-active"
                    : ""
                }`}
                ref={formssDropdownRef}
              >
                {pokeData.forms.map((obj, i) => {
                  // Extract the Pokémon number from the Pokémon URL
                  const parts = obj.url.split("/");
                  const cleanedParts = parts.filter((part) => part !== "");
                  const lastPart = cleanedParts[cleanedParts.length - 1];
                  const number = parseInt(lastPart, 10);
                  const formName = obj.name.split("-");
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
                            number === pokeData.id || i === 0
                              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`
                              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}-${formName[1]}.png`
                          }
                          alt={`${obj.name}`}
                          className="dyn-section-button-full-img"
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ),
      id: 1,
    },
    {
      text: "Varieties",
      info: (
        <div className="dyn-section-button-container">
          {pokeSpeciesData.varieties.length < 5 ? (
            pokeSpeciesData.varieties.map((obj, i) => {
              // Extract the Pokémon number from the Pokémon URL
              const parts = obj.pokemon.url.split("/");
              const cleanedParts = parts.filter((part) => part !== "");
              const lastPart = cleanedParts[cleanedParts.length - 1];
              const number = parseInt(lastPart, 10);
              const isDisabled = number === pokeData.id;

              // Function to handle image error and hide the parent div
              const handleImageError = (e) => {
                e.target.closest(
                  ".dyn-section-button-img-container"
                ).style.display = "none";
              };

              return (
                <motion.button
                  className={`dyn-section-button ${fontStyle} ${infoButtonStyle} ${
                    isDisabled ? inactiveButtonStyle : ""
                  }`}
                  key={i}
                  onClick={() => handleChangePokemon(number)}
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
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}
                      alt={`${obj.pokemon.name}`}
                      className="dyn-section-button-full-img"
                      onError={handleImageError} // Add error handling
                    />
                  </div>
                </motion.button>
              );
            })
          ) : (
            <div className="dyn-section-dropdown-container">
              <button
                className={`dyn-section-dropdown-button ${fontStyle} ${infoButtonStyle}`}
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
                className={`dyn-section-dropdown-results ${formsResultsStyle} ${
                  isActiveVarietiesDropdown
                    ? "dyn-section-dropdown-results-active"
                    : ""
                }`}
                ref={varietiesDropdownRef}
              >
                {pokeSpeciesData.varieties.map((obj, i) => {
                  // Extract the Pokémon number from the Pokémon URL
                  const parts = obj.pokemon.url.split("/");
                  const cleanedParts = parts.filter((part) => part !== "");
                  const lastPart = cleanedParts[cleanedParts.length - 1];
                  const number = parseInt(lastPart, 10);
                  const isDisabled = number === pokeData.id;

                  // Function to handle image error and hide the parent div
                  const handleImageError = (e) => {
                    e.target.closest(
                      ".dyn-section-button-img-container"
                    ).style.display = "none";
                  };

                  return (
                    <motion.button
                      className={`dyn-section-dropdown-items ${fontStyle} ${infoButtonStyle} ${
                        isDisabled ? inactiveButtonStyle : ""
                      }`}
                      key={i}
                      onClick={() => handleChangePokemon(number)}
                      disabled={isDisabled}
                      whileHover={!isDisabled ? { scale: 1.1 } : undefined}
                      whileTap={!isDisabled ? { scale: 0.9 } : undefined}
                      transition={!isDisabled ? { duration: 0.1 } : undefined}
                    >
                      {getPokeName(obj.pokemon.name)}
                      <div className="dyn-section-button-img-container">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}
                          alt={`${obj.pokemon.name}`}
                          className="dyn-section-button-full-img"
                          onError={handleImageError} // Add error handling
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ),
      id: 2,
    },
  ];

  // Display the forms information for the current Pokémon
  return (
    <div
      className={`${
        screenSize === "large"
          ? "secondary-table-conainer-50"
          : "secondary-table-conainer-30"
      }`}
    >
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Forms</div>
      <DynamicTableSection sectionInfo={formInfo} isDarkMode={isDarkMode} />
    </div>
  );
};

export default FormsInfo;
