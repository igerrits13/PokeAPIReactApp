import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DynamicTableSection from "../CommonComponents/DynamicTableSection";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
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

  // Create the objects that hold infromation for training, breeding and form information
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

    breedingInfo = [
      {
        text: "Egg Groups",
        info: `Egg group`,
        id: 0,
      },
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
