import { Link } from "react-router-dom";
import { motion } from "motion/react";
import DynamicTableSection from "../../CommonComponents/DynamicComponents/DynamicTableSection";
import egg from "../../icons/egg.png";

// Breeding information section for the current Pokémon
const BreedingInfo = ({
  pokeSpeciesData,
  whosThatPokemon,
  babyTriggerItem,
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
    ? "option-font-dark"
    : "option-font-light";

  // Map to match for each possible gen counter
  const genCounter = {
    "generation-i": 255,
    "generation-ii": 256,
    "generation-iii": 256,
    "generation-iv": 255,
    "generation-v": 257,
    "generation-vi": 257,
    "generation-vii": 256,
    "generation-viii": 255,
    "generation-ix": 128,
  };

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Calculate the egg hatch counter based on the current gen
  const getHatchCounter = (counter) => {
    if (genCounter[pokeSpeciesData.generation.name]) {
      const y = genCounter[pokeSpeciesData.generation.name];
      return y * (counter + 1);
    }
    return 255 * (counter + 1);
  };

  // Data structure to store the breeding information for the current Pokémon
  const breedingInfo = [
    {
      text: "Baby Trigger Item",
      info: whosThatPokemon
        ? "????"
        : babyTriggerItem !== null
        ? `${getPokeName(babyTriggerItem.name)}`
        : "None",
      id: 0,
    },
    {
      text: "Egg Groups",
      info: whosThatPokemon ? (
        "????"
      ) : (
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
                  <img src={egg} alt="egg" className="dyn-section-button-img" />
                </div>
              </motion.button>
            );
          })}
        </div>
      ),
      id: 1,
    },
    {
      text: "Hatch Counter",
      info: whosThatPokemon
        ? "????"
        : `${pokeSpeciesData.hatch_counter} Cycles (${getHatchCounter(
            pokeSpeciesData.hatch_counter
          ).toLocaleString()} Steps)`,
      id: 2,
    },
    {
      text: "Gender Rate",
      info: whosThatPokemon ? (
        <>
          ??% <i className="fa-solid fa-mars"></i> / ??%{" "}
          <i className="fa-solid fa-venus"></i>
        </>
      ) : pokeSpeciesData.gender_rate === -1 ? (
        "Genderless"
      ) : (
        <>
          {(1 - pokeSpeciesData.gender_rate / 8) * 100}%{" "}
          <i className="fa-solid fa-mars"></i> /{" "}
          {(pokeSpeciesData.gender_rate / 8) * 100}%{" "}
          <i className="fa-solid fa-venus"></i>
        </>
      ),
      id: 3,
    },
    {
      text: "Gender Differences",
      info: whosThatPokemon
        ? "????"
        : pokeSpeciesData.has_gender_differences === true
        ? "True"
        : "False",
      id: 4,
    },
    {
      text: "Evolves From",
      info: whosThatPokemon ? (
        "????"
      ) : pokeSpeciesData.evolves_from_species !== undefined &&
        pokeSpeciesData.evolves_from_species !== null ? (
        <Link
          className={`clean-text`} // ${fontStyle}
          to={`/pokemon/${pokeSpeciesData.evolves_from_species.name}`}
        >
          <motion.div
            className="dyn-section-link"
            whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
            whileTap={{ scale: 0.9, rotate: "5deg" }}
            transition={{ duration: 0.1 }}
          >
            {getPokeName(pokeSpeciesData.evolves_from_species.name)}
          </motion.div>
        </Link>
      ) : (
        "None"
      ),
      id: 5,
    },
    {
      text: "Growth Rate",
      info: whosThatPokemon
        ? "????"
        : `${
            pokeSpeciesData?.growth_rate?.name !== undefined &&
            pokeSpeciesData?.growth_rate?.name !== null
              ? pokeSpeciesData?.growth_rate?.name[0].toUpperCase() +
                pokeSpeciesData?.growth_rate?.name.slice(1)
              : "None"
          }`,
      id: 6,
    },
    {
      text: "Habitat",
      info: whosThatPokemon
        ? "????"
        : `${
            pokeSpeciesData?.habitat?.name !== undefined &&
            pokeSpeciesData?.habitat?.name !== null
              ? pokeSpeciesData.habitat.name[0].toUpperCase() +
                pokeSpeciesData.habitat.name.slice(1)
              : "None"
          }`,
      id: 7,
    },
  ];

  // Display the breeding information for the current Pokémon
  return (
    <div
      className={`${
        screenSize === "large"
          ? "secondary-table-conainer-50"
          : "secondary-table-conainer-30"
      }`}
    >
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Breeding</div>
      <DynamicTableSection sectionInfo={breedingInfo} isDarkMode={isDarkMode} />
    </div>
  );
};

export default BreedingInfo;
