import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import PokeInfo from "./PokeInfo";
// import BattleDisplay from "./BattleDisplay";
import Footer from "../CommonComponents/Footer";

// Temporary page while Pokémon page is not done
const PokeView = ({ fullPokeResults, screenSize, isDarkMode }) => {
  // Setup data structures to store the id of the Pokémon search, and for navigation to other pages
  const { id } = useParams();
  const [isPokeLoading, setIsPokeLoading] = useState(true);
  const [pokeData, setPokeData] = useState(null);
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
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}/`
            );
            if (!response.ok) {
              navigate("/notfound");
              return;
            }
            const jsonData = await response.json();
            setPokeData(jsonData);
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
      {!isPokeLoading && (
        <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
          {pokeData.name[0].toUpperCase() + pokeData.name.slice(1)}
        </div>
      )}
      <PokeInfo
        isPokeLoading={isPokeLoading}
        isDarkMode={isDarkMode}
        screenSize={screenSize}
      />
      {/* <div>
        <BattleDisplay />
      </div> */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PokeView;
