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
                // <Link
                //   className={`clean-text ${fontStyle}`}
                //   to={pokeIdURL}
                //   key={i}
                // >
                <motion.button
                  // className={`dyn-section-button ${fontStyle} ${infoButtonStyle} ${
                  //   isDisabled ? inactiveButtonStyle : ""
                  // }`}
                  className={`dyn-section-button ${fontStyle} ${infoButtonStyle} ${inactiveButtonStyle}`}
                  key={i}
                  disabled
                  // disabled={isDisabled}
                  // whileHover={
                  //   !isDisabled ? { scale: 1.1, rotate: "-1.5deg" } : undefined
                  // }
                  // whileTap={
                  //   !isDisabled ? { scale: 0.9, rotate: "5deg" } : undefined
                  // }
                  // transition={!isDisabled ? { duration: 0.1 } : undefined}
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
                // </Link>
              );
            })
          ) : (
            <></>
          )}
        </div>
      ),
      id: 1,
    },
    {
      text: "Varieties",
      info: (
        <div className="dyn-section-button-container">
          {pokeSpeciesData.varieties.map((obj, i) => {
            // Extract the Pokémon number from the Pokémon URL
            const parts = obj.pokemon.url.split("/");
            const cleanedParts = parts.filter((part) => part !== "");
            const lastPart = cleanedParts[cleanedParts.length - 1];
            const number = parseInt(lastPart, 10);
            const isDisabled = number === pokeData.id;
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
                  />
                </div>
              </motion.button>
            );
          })}
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
