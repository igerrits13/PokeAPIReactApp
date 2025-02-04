import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import PokeInfoTable from "./PokeInfoTable";
import Footer from "../CommonComponents/Footer";

// Temporary page while Pokémon page is not done
const PokeView = ({ fullPokeResults, screenSize, isDarkMode }) => {
  // Setup data structures to store various Pokemon and loading information
  const { id } = useParams();
  const [pokeId, setPokeId] = useState(id);
  const [pokeData, setPokeData] = useState(null);
  const [isPokeLoading, setIsPokeLoading] = useState(true);
  const [pokeSpeciesId, setPokeSpeciesId] = useState(id);
  const [pokeSpeciesData, setPokeSpeciesData] = useState(null);
  const [isPokeSpeciesLoading, setIsPokeSpeciesLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Adjust the container style of the page based on the current screensize
  const containerSize =
    screenSize === "small"
      ? "notfound-small"
      : screenSize === "medium"
      ? "notfound-med"
      : "notfound-large";

  // Fetch data for the current Pokémon-Species
  useEffect(() => {
    if (fullPokeResults.length > 0) {
      const fetchData = async () => {
        // Check if the id is within the valid Pokémon
        if (
          (pokeSpeciesId > 0 && pokeSpeciesId <= fullPokeResults.length) ||
          isNaN(pokeSpeciesId)
        ) {
          setIsPokeSpeciesLoading(true);
          try {
            const [response] = await Promise.all([
              fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${pokeSpeciesId}/`
              ),
            ]);
            if (!response.ok) {
              navigate("/notfound");
              return;
            }
            const jsonData = await response.json();
            setPokeSpeciesData(jsonData);
          } catch (error) {
            setError(error);
          } finally {
            setIsPokeSpeciesLoading(false);
          }
        } else {
          setIsPokeSpeciesLoading(false);
          navigate("/notfound");
          return;
        }
      };

      fetchData();
    }
  }, [pokeSpeciesId, navigate, fullPokeResults]);

  // Fetch data for the current Pokémon
  useEffect(() => {
    if (fullPokeResults.length > 0) {
      const fetchData = async () => {
        setIsPokeLoading(true);
        try {
          const [response] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`),
          ]);
          if (!response) {
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
      };

      fetchData();
    }
  }, [pokeId, navigate, fullPokeResults]);

  // Reload Pokémon and Pokémon-speecies information if the search id changes
  useEffect(() => {
    setPokeId(id);
    setPokeSpeciesId(id);
  }, [id]);

  // If the API call returns an error, navigate to the page not found
  // (Redundant to inside fetch call to avoid compilation error)
  if (error) {
    navigate("/notfound");
    return;
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
      {!isPokeLoading && !isPokeSpeciesLoading && (
        <PokeInfoTable
          setPokeId={setPokeId}
          pokeData={pokeData}
          // isPokeLoading={isPokeLoading}
          pokeSpeciesData={pokeSpeciesData}
          // isPokeSpeciesLoading={isPokeSpeciesLoading}
          isDarkMode={isDarkMode}
          screenSize={screenSize}
        />
      )}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PokeView;
