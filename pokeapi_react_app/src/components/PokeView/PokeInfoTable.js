import { Link } from "react-router-dom";
import { motion } from "motion/react";
import DynamicTableSection from "../CommonComponents/DynamicTableSection";
import egg from "../icons/egg.png";
import PokeBasicInfo from "./PokeBasicInfo";
import PokeImage from "./PokeImage";

// Pokémon information and image
const PokeInfoTable = ({
  setPokeId,
  pokeData,
  isPokeLoading,
  pokeSpeciesData,
  isPokeSpeciesLoading,
  isDarkMode,
  screenSize,
}) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
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

  const getHatchCounter = (counter) => {
    let y;
    if (
      pokeSpeciesData.generation.name === "generation-ii" ||
      pokeSpeciesData.generation.name === "generation-iii" ||
      pokeSpeciesData.generation.name === "generation-vii"
    ) {
      y = 256;
    } else if (pokeSpeciesData.generation.name === "generation-iv") {
      y = 255;
    } else if (
      pokeSpeciesData.generation.name === "generation-v" ||
      pokeSpeciesData.generation.name === "generation-vi"
    ) {
      y = 257;
    } else if (pokeSpeciesData.generation.name === "generation-viii") {
      y = 255;
    } else if (pokeSpeciesData.generation.name === "generation-ix") {
      y = 128;
    } else {
      y = 255;
    }
    return y * (counter + 1);
  };

  const handleChangePokemon = (pokeNum) => {
    setPokeId(pokeNum);
  };

  // Create the objects that hold infromation for training, breeding and form information
  let trainingInfo, breedingInfo, formInfo;
  if (!isPokeLoading && !isPokeSpeciesLoading) {
    trainingInfo = [
      { text: "Base XP", info: `${pokeData.base_experience} XP`, id: 0 },
      {
        text: "Base Happiness",
        // info: `${
        //   pokeSpeciesData?.base_happiness !== undefined &&
        //   pokeSpeciesData?.base_happiness !== null
        //     ? pokeSpeciesData.base_happiness +
        //       " (" +
        //       ((pokeSpeciesData.base_happiness / 255) * 100).toFixed(0) +
        //       "% Happy)"
        //     : "None"
        // }`,
        info: `${pokeSpeciesData.base_happiness} (${(
          (pokeSpeciesData.base_happiness / 255) *
          100
        ).toFixed(0)}% Happy)`,
        id: 1,
      },
      {
        text: "Capture Rate",
        info: `${pokeSpeciesData.capture_rate} (${(
          (pokeSpeciesData.capture_rate / 255) *
          100
        ).toFixed(0)}% Chance)`,
        id: 2,
      },
    ];

    breedingInfo = [
      {
        text: "Egg Groups",
        info: (
          <div className="dyn-section-button-container">
            {pokeSpeciesData.egg_groups.map((obj, i) => {
              return (
                <motion.button
                  // className={`dyn-section-button ${fontStyle} ${infoButtonStyle}`}
                  className={`dyn-section-button ${fontStyle} ${infoButtonStyle} ${inactiveButtonStyle}`}
                  key={i}
                  disabled
                  // whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
                  // whileTap={{ scale: 0.9, rotate: "5deg" }}
                  // transition={{ duration: 0.1 }}
                >
                  {obj.name[0].toUpperCase() + obj.name.slice(1)}
                  <div className="dyn-section-button-img-container">
                    <img
                      src={egg}
                      alt="egg"
                      className="dyn-section-button-img"
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        ),
        id: 0,
      },
      {
        text: "Evolves From",
        info:
          pokeSpeciesData.evolves_from_species !== undefined &&
          pokeSpeciesData.evolves_from_species !== null ? (
            <Link
              className={`clean-text ${fontStyle}`}
              to={`/pokemon/${pokeSpeciesData.evolves_from_species.name}`}
            >
              <motion.div
                className="dyn-section-link"
                whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
                whileTap={{ scale: 0.9, rotate: "5deg" }}
                transition={{ duration: 0.1 }}
              >
                {pokeSpeciesData.evolves_from_species.name[0].toUpperCase() +
                  pokeSpeciesData.evolves_from_species.name.slice(1)}
              </motion.div>
            </Link>
          ) : (
            "None"
          ),
        id: 1,
      },
      {
        text: "Gender Rate",
        info:
          pokeSpeciesData.gender_rate === -1 ? (
            "Genderless"
          ) : (
            <>
              {(1 - pokeSpeciesData.gender_rate / 8) * 100}%{" "}
              <i className="fa-solid fa-mars"></i> /{" "}
              {(pokeSpeciesData.gender_rate / 8) * 100}%{" "}
              <i className="fa-solid fa-venus"></i>
            </>
          ),
        id: 2,
      },
      {
        text: "Gender Differences",
        info:
          pokeSpeciesData.has_gender_differences === "true" ? "True" : "False",
        id: 3,
      },
      {
        text: "Hatch Counter",
        info: `${pokeSpeciesData.hatch_counter} Cycles (${getHatchCounter(
          pokeSpeciesData.hatch_counter
        ).toLocaleString()} Steps)`,
        id: 4,
      },
      {
        text: "Habitat",
        info: `${
          pokeSpeciesData?.habitat?.name !== undefined &&
          pokeSpeciesData?.habitat?.name !== null
            ? pokeSpeciesData.habitat.name[0].toUpperCase() +
              pokeSpeciesData.habitat.name.slice(1)
            : "None"
        }`,
        id: 5,
      },
    ];

    formInfo = [
      {
        text: "Default Form",
        info: pokeData.is_default === true ? "True" : "False",
        id: 0,
      },
      {
        text: "Alternate Forms",
        // info: `Forms`,
        info: (
          <div className="dyn-section-button-container">
            {pokeData.forms.length < 5 ? (
              pokeData.forms.map((obj, i) => {
                // Extract the Pokémon number from the Pokémon URL
                const parts = obj.url.split("/");
                const cleanedParts = parts.filter((part) => part !== "");
                const lastPart = cleanedParts[cleanedParts.length - 1];
                const number = parseInt(lastPart, 10);
                // const pokeIdURL = `/pokemon/${number}`;
                // const isDisabled =
                //   number === pokeSpeciesData.id || obj.name === pokeData.name;
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
  }

  // Display for the Pokémon information and image
  return (
    <div
      className={`${
        screenSize === "small" || screenSize === "medium"
          ? "secondary-grid-row-small-med"
          : "secondary-grid-row-large"
      } ${fontStyle}`}
    >
      {screenSize === "small" || screenSize === "medium" ? (
        <>
          <PokeImage pokeData={pokeData} isDarkMode={isDarkMode} />
          <PokeBasicInfo
            pokeData={pokeData}
            pokeSpeciesData={pokeSpeciesData}
            screenSize={screenSize}
            isDarkMode={isDarkMode}
          />
        </>
      ) : (
        <>
          <PokeBasicInfo
            pokeData={pokeData}
            pokeSpeciesData={pokeSpeciesData}
            screenSize={screenSize}
            isDarkMode={isDarkMode}
          />
          <PokeImage pokeData={pokeData} isDarkMode={isDarkMode} />
        </>
      )}
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "secondary-grid-row-small-med"
            : "secondary-grid-row-large"
        } ${fontStyle}`}
      >
        <div
          className={`${
            screenSize === "large"
              ? "secondary-table-conainer-50"
              : "secondary-table-conainer-30"
          }`}
        >
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Breeding</div>
          {!isPokeLoading && !isPokeSpeciesLoading && (
            <DynamicTableSection
              sectionInfo={breedingInfo}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
        <div
          className={`${
            screenSize === "large"
              ? "secondary-table-conainer-50"
              : "secondary-table-conainer-30"
          }`}
        >
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Training</div>
          {!isPokeLoading && !isPokeSpeciesLoading && (
            <DynamicTableSection
              sectionInfo={trainingInfo}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
        <div
          className={`${
            screenSize === "large"
              ? "secondary-table-conainer-50"
              : "secondary-table-conainer-30"
          }`}
        >
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Forms</div>
          {!isPokeLoading && !isPokeSpeciesLoading && (
            <DynamicTableSection
              sectionInfo={formInfo}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PokeInfoTable;
