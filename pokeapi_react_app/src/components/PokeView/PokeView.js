import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import DynamicTableSection from "../CommonComponents/DynamicTableSection";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import egg from "../icons/egg.png";
import PokeInfoTable from "./PokeInfoTable";
import Footer from "../CommonComponents/Footer";

// Temporary page while Pokémon page is not done
const PokeView = ({ fullPokeResults, screenSize, isDarkMode }) => {
  // Setup data structures to store the id of the Pokémon search, and for navigation to other pages
  const { id } = useParams();
  const [isPokeLoading, setIsPokeLoading] = useState(true);
  const [pokeData, setPokeData] = useState(null);
  const [pokeSpeciesData, setPokeSpeciesData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "notfound-small"
      : screenSize === "medium"
      ? "notfound-med"
      : "notfound-large";
  const infoButtonStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";
  const inactiveButtonStyle = isDarkMode
    ? "option-font-dark clean-border"
    : "option-font-light clean-border";

  // Fetch data for the current type
  useEffect(() => {
    if (fullPokeResults.length > 0) {
      const fetchData = async () => {
        // Check if the id is within the valid Pokémon
        if ((id > 0 && id <= fullPokeResults.length) || isNaN(id)) {
          setIsPokeLoading(true);
          try {
            const [response1, response2] = await Promise.all([
              fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`),
              fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`),
            ]);
            if (!response1.ok || !response2.ok) {
              navigate("/notfound");
              return;
            }
            const jsonData1 = await response1.json();
            const jsonData2 = await response2.json();
            setPokeData(jsonData1);
            setPokeSpeciesData(jsonData2);
          } catch (error) {
            setError(error);
          } finally {
            setIsPokeLoading(false);
          }
        } else {
          setIsPokeLoading(false);
          navigate("/notfound");
          return;
        }
      };

      fetchData();
    }
  }, [id, navigate, fullPokeResults]);

  // If the API call returns an error, navigate to the page not found
  // (Redundant to inside fetch call to avoid compilation error)
  if (error) {
    navigate("/notfound");
    return;
  }

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

  // Create the objects that hold infromation for training, breeding and form information
  let trainingInfo, breedingInfo, formInfo;
  if (!isPokeLoading) {
    trainingInfo = [
      { text: "Base XP", info: `${pokeData.base_experience} XP`, id: 0 },
      {
        text: "Base Happiness",
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
                  className={`dyn-section-button ${fontStyle} ${infoButtonStyle}`}
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
        text: "Forms",
        // info: `Forms`,
        info: (
          <div className="dyn-section-button-container">
            {pokeData.forms.map((obj, i) => {
              // Extract the Pokémon number from the Pokémon URL
              const parts = obj.url.split("/");
              const cleanedParts = parts.filter((part) => part !== "");
              const lastPart = cleanedParts[cleanedParts.length - 1];
              const number = parseInt(lastPart, 10);
              const pokeIdURL = `/pokemon/${number}`;
              const isDisabled = number === pokeData.id;
              const formName = obj.name.split("-");
              return (
                <Link
                  className={`clean-text ${fontStyle}`}
                  to={pokeIdURL}
                  key={i}
                >
                  <motion.button
                    className={`dyn-section-button ${fontStyle} ${infoButtonStyle} ${
                      isDisabled ? inactiveButtonStyle : ""
                    }`}
                    disabled={isDisabled}
                    whileHover={
                      !isDisabled
                        ? { scale: 1.1, rotate: "-1.5deg" }
                        : undefined
                    }
                    whileTap={
                      !isDisabled ? { scale: 0.9, rotate: "5deg" } : undefined
                    }
                    transition={!isDisabled ? { duration: 0.1 } : undefined}
                  >
                    {getPokeName(obj.name)}
                    <div className="dyn-section-button-img-container">
                      <img
                        src={
                          number === pokeData.id
                            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`
                            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}-${formName[1]}.png`
                        }
                        alt={`${obj.name}`}
                        className="dyn-section-button-full-img"
                      />
                    </div>
                  </motion.button>
                </Link>
              );
            })}
          </div>
        ),
        id: 0,
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
              const pokeIdURL = `/pokemon/${number}`;
              const isDisabled = number === pokeData.id;
              return (
                <Link
                  className={`clean-text ${fontStyle}`}
                  to={pokeIdURL}
                  key={i}
                >
                  <motion.button
                    className={`dyn-section-button ${fontStyle} ${infoButtonStyle} ${
                      isDisabled ? inactiveButtonStyle : ""
                    }`}
                    disabled={isDisabled}
                    whileHover={
                      !isDisabled
                        ? { scale: 1.1, rotate: "-1.5deg" }
                        : undefined
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
                </Link>
              );
            })}
          </div>
        ),
        id: 1,
      },
      {
        text: "Default Form",
        info: pokeData.is_default === true ? "True" : "False",
        id: 2,
      },
    ];
  }

  // Display the Pokémon page
  return (
    <div
      className={`pokemonview-container ${containerSize} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      <SecondaryViewHeader
        fullPokeResults={fullPokeResults}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      {!isPokeLoading && (
        <PokeInfoTable
          pokeData={pokeData}
          pokeSpeciesData={pokeSpeciesData}
          isPokeLoading={isPokeLoading}
          isDarkMode={isDarkMode}
          screenSize={screenSize}
        />
      )}
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "secondary-grid-row-small-med"
            : "secondary-grid-row-large"
        } ${fontStyle}`}
      >
        <div className="secondary-table-conainer-30">
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Breeding</div>
          {!isPokeLoading && (
            <DynamicTableSection
              sectionInfo={breedingInfo}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
        <div className="secondary-table-conainer-30">
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Training</div>
          {!isPokeLoading && (
            <DynamicTableSection
              sectionInfo={trainingInfo}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
        <div className="secondary-table-conainer-30">
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Forms</div>
          {!isPokeLoading && (
            <DynamicTableSection
              sectionInfo={formInfo}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PokeView;
