import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { ReactComponent as BugType } from "../icons/bug.svg";
// import { ReactComponent as DarkType } from "../icons/dark.svg";
// import { ReactComponent as DragonType } from "../icons/dragon.svg";
// import { ReactComponent as ElectricType } from "../icons/electric.svg";
// import { ReactComponent as FairyType } from "../icons/fairy.svg";
// import { ReactComponent as FightingType } from "../icons/fighting.svg";
// import { ReactComponent as FireType } from "../icons/fire.svg";
// import { ReactComponent as FlyingType } from "../icons/flying.svg";
// import { ReactComponent as GhostType } from "../icons/ghost.svg";
// import { ReactComponent as GrassType } from "../icons/grass.svg";
// import { ReactComponent as GroundType } from "../icons/ground.svg";
// import { ReactComponent as IceType } from "../icons/ice.svg";
// import { ReactComponent as NormalType } from "../icons/normal.svg";
// import { ReactComponent as PoisonType } from "../icons/poison.svg";
// import { ReactComponent as PsychicType } from "../icons/psychic.svg";
// import { ReactComponent as RockType } from "../icons/rock.svg";
// import { ReactComponent as SteelType } from "../icons/steel.svg";
// import { ReactComponent as WaterType } from "../icons/water.svg";
import DynamicTableSection from "../CommonComponents/DynamicTableSection";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import PokeInfoTable from "./PokeInfoTable";
// import TypesResultsItem from "../HomeView/TypesResultsItem";
// import BattleDisplay from "./BattleDisplay";
import Footer from "../CommonComponents/Footer";

// Temporary page while Pokémon page is not done
const PokeView = ({ fullPokeResults, screenSize, isDarkMode }) => {
  // Setup data structures to store the id of the Pokémon search, and for navigation to other pages
  const { id } = useParams();
  const [isPokeLoading, setIsPokeLoading] = useState(true);
  const [pokeData, setPokeData] = useState(null);
  const [pokeSpeciesData, setPokeSpeciesData] = useState(null);
  // const [pokeSpeciesData, setPokeSpeciesData] = useState(null);
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

  // Fetch data for the current type
  useEffect(() => {
    if (fullPokeResults) {
      const fetchData = async () => {
        // Check if the id is within the valid Pokémon
        if ((id > 0 && id <= fullPokeResults.length) || isNaN(id)) {
          setIsPokeLoading(true);
          try {
            console.log("Fetching");
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

  // // Map to match for each possible type case
  // const typeMapping = {
  //   bug: [BugType, "bug-type"],
  //   dark: [DarkType, "dark-type"],
  //   dragon: [DragonType, "dragon-type"],
  //   electric: [ElectricType, "electric-type"],
  //   fairy: [FairyType, "fairy-type"],
  //   fighting: [FightingType, "fighting-type"],
  //   fire: [FireType, "fire-type"],
  //   flying: [FlyingType, "flying-type"],
  //   ghost: [GhostType, "ghost-type"],
  //   grass: [GrassType, "grass-type"],
  //   ground: [GroundType, "ground-type"],
  //   ice: [IceType, "ice-type"],
  //   normal: [NormalType, "normal-type"],
  //   poison: [PoisonType, "poison-type"],
  //   psychic: [PsychicType, "psychic-type"],
  //   rock: [RockType, "rock-type"],
  //   steel: [SteelType, "steel-type"],
  //   water: [WaterType, "water-type"],
  // };

  // // Set the type attributes for the current type based on type name and if the user is in dark mode or not
  // function getTypeIcon(typeName) {
  //   if (typeMapping[typeName]) {
  //     const [typeIcon, baseClass] = typeMapping[typeName];
  //     const modeSuffix = isDarkMode ? "-dark" : "-light";
  //     return [typeIcon, `${baseClass}${modeSuffix}`];
  //   }
  //   return null;
  // }

  // // Get the styling for the current type
  // let typeIcon, typeStyle, typeIconsHTML;
  // if (!isPokeLoading) {
  //   typeIconsHTML = (
  //     <div className="types-box">
  //       {Object.entries(pokeData.types).map((obj) => {
  //         [typeIcon, typeStyle] = getTypeIcon(obj[1].type.name);
  //         return (
  //           <TypesResultsItem
  //             key={obj[0]}
  //             obj={obj[1].type}
  //             typeIcon={typeIcon}
  //             typeStyle={typeStyle}
  //             isDarkMode={isDarkMode}
  //           />
  //         );
  //       })}
  //     </div>
  //   );
  // }

  let trainingInfo, breedingInfo, formInfo;
  if (!isPokeLoading) {
    trainingInfo = [
      { text: "Base XP", info: `${pokeData.base_experience}`, id: 0 },
      {
        text: "Base Happiness",
        info: `${pokeSpeciesData.base_happiness}`,
        id: 1,
      },
      {
        text: "Capture Rate",
        info: `${((pokeSpeciesData.capture_rate / 255) * 100).toFixed(0)}%`,
        id: 2,
      },
      {
        text: "Evolves From",
        info: `${
          pokeSpeciesData.evolves_from_species !== undefined &&
          pokeSpeciesData.evolves_from_species !== null
            ? pokeSpeciesData.evolves_from_species.name
            : "None"
        }`,
        id: 3,
      },
    ];

    // const getGenerationTitle = (generation) => {
    //   let genTitle = generation.split("-");
    //   genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    //   genTitle[1] = genTitle[1].toUpperCase();
    //   return genTitle.join(" ");
    // };

    breedingInfo = [
      {
        text: "Egg Groups",
        info: `Egg group`,
        id: 0,
      },
      // {
      //   text: "Gender Rate",
      //   info: `${
      //     pokeSpeciesData.gender_rate === -1
      //       ? "Genderless"
      //       : (1 - pokeSpeciesData.gender_rate / 8) * 100 +
      //         "% Male / " +
      //         (pokeSpeciesData.gender_rate / 8) * 100 +
      //         "% "
      //   }`,
      //   id: 1,
      // },
      {
        text: "Gender Rate",
        info:
          pokeSpeciesData.gender_rate === -1 ? (
            "Genderless"
          ) : (
            <>
              {(1 - pokeSpeciesData.gender_rate / 8) * 100}%{" "}
              <i class="fa-solid fa-mars"></i> /{" "}
              {(pokeSpeciesData.gender_rate / 8) * 100}%{" "}
              <i class="fa-solid fa-venus"></i>
            </>
          ),
        id: 1,
      },
      {
        text: "Gender Differences",
        info: `${pokeSpeciesData.has_gender_differences}`,
        id: 2,
      },
      {
        text: "Hatch Counter",
        info: `${pokeSpeciesData.hatch_counter}`,
        id: 3,
      },
    ];

    formInfo = [
      {
        text: "Forms",
        info: `Forms`,
        id: 0,
      },
      {
        text: "Varieties",
        info: `Varieties`,
        id: 1,
      },
      {
        text: "Default Form",
        info: `${pokeData.is_default}`,
        id: 2,
      },
    ];
  }

  // Display the temporary Pokémon page
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
      {/* {!isPokeLoading && (
        <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
          {pokeData.name[0].toUpperCase() + pokeData.name.slice(1)}
        </div>
      )}
      {typeIconsHTML}
      {!isPokeLoading && (
        <div
          className={`${
            screenSize === "small" || screenSize === "medium"
              ? "description-box-small-med"
              : "description-box-large"
          } ${fontStyle}`}
        >
          {pokeSpeciesData.flavor_text_entries[0].flavor_text}
        </div>
      )} */}
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
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Training</div>
          {!isPokeLoading && (
            <DynamicTableSection
              sectionInfo={trainingInfo}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
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
