import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ScrollToTop from "../CommonComponents/ScrollToTop";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import PokeInfoTable from "./InformationTableComponents/PokeInfoTable";
import StatsTable from "./StatsTable";
import EvolutionChain from "./EvolutionDisplayComponents/EvolutionChain";
import SpritesTable from "./SpritesTableComponents/SpritesTable";
import NavButtons from "./NavigationComponents/NavButons";
import Footer from "../CommonComponents/Footer";

// Temporary page while Pokémon page is not done
const PokeView = ({
  fullPokeResults,
  whosThatPokemon,
  setWhosThatPokemon,
  typesResults,
  screenSize,
  isDarkMode,
}) => {
  // Setup data structures to store various Pokemon and loading information
  const { id } = useParams();
  const [pokeId, setPokeId] = useState(id);
  const [pokeData, setPokeData] = useState(null);
  const [isPokeLoading, setIsPokeLoading] = useState(true);
  const [pokeSpeciesId, setPokeSpeciesId] = useState(id);
  const [pokeSpeciesData, setPokeSpeciesData] = useState(null);
  const [isPokeSpeciesLoading, setIsPokeSpeciesLoading] = useState(true);
  const [babyTriggerItem, setBabyTriggerItem] = useState(null);
  const [level, setLevel] = useState(1);
  const navigate = useNavigate();
  const hasRenderedRef = useRef(false);

  // Adjust the container style of the page based on the current screensize
  const containerSize =
    screenSize === "small"
      ? "pokemonview-small"
      : screenSize === "medium"
      ? "pokemonview-med"
      : "pokemonview-large";

  // Fetch data for the current Pokémon-Species
  const fetchSpeciesInfo = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeSpeciesId}/`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  };

  // Query the data for the current Pokémon species
  const {
    data: speciesInfoData,
    isLoading: isSpeciesInfoLoading,
    error: speciesInfoError,
  } = useQuery({
    queryKey: ["PokeSpeciesInfo", pokeSpeciesId],
    queryFn: fetchSpeciesInfo,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (speciesInfoData) {
      setPokeSpeciesData(speciesInfoData);
      setIsPokeSpeciesLoading(isSpeciesInfoLoading);
    }
  }, [speciesInfoData, isSpeciesInfoLoading]);

  // Fetch data for the current Pokémon
  const fetchPokeInfo = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokeId}/`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  };

  // Query the data for the current Pokémon
  const {
    data: pokeInfoData,
    isLoading: isPokeInfoLoading,
    error: pokeInfoError,
  } = useQuery({
    queryKey: ["pokeInfo", pokeId],
    queryFn: fetchPokeInfo,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (pokeInfoData) {
      setPokeData(pokeInfoData);
      setIsPokeLoading(isPokeInfoLoading);
    }
  }, [pokeInfoData, isPokeInfoLoading]);

  // Reload Pokémon and Pokémon-speecies information if the search id changes
  useEffect(() => {
    setPokeId(id);
    setPokeSpeciesId(id);
  }, [id]);

  // Scroll to top of page on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pokeData]);

  // If the id changes while on the second render of the page, set Pokémon data to not be blank
  useEffect(() => {
    if (!hasRenderedRef.current) {
      hasRenderedRef.current = true;
      return;
    }
    setWhosThatPokemon(false);
  }, [setWhosThatPokemon, id]);

  if (speciesInfoError || pokeInfoError) {
    console.error("Error occured:", speciesInfoError || pokeInfoError);
    navigate("/notfound");
  }

  const statsInfo = [
    {
      name: "Stat",
      base: "Base",
      fullMin: "Min",
      fullMax: "Max",
      id: 0,
    },
  ];

  if (pokeData !== null) {
    pokeData.stats.forEach((stat, index) => {
      statsInfo.push({
        name: stat.stat.name,
        base: stat.base_stat,
        id: index + 1,
      });
    });
  }

  // Display the Pokémon page
  return (
    <>
      <ScrollToTop isDarkMode={isDarkMode} />
      <SecondaryViewHeader
        fullPokeResults={fullPokeResults}
        typesResults={typesResults}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      <div
        className={`pokemonview-container ${containerSize} ${
          isDarkMode ? "background-dark" : "background-light"
        }`}
      >
        {!isPokeLoading && !isPokeSpeciesLoading && (
          <PokeInfoTable
            setPokeId={setPokeId}
            pokeData={pokeData}
            pokeSpeciesData={pokeSpeciesData}
            whosThatPokemon={whosThatPokemon}
            setWhosThatPokemon={setWhosThatPokemon}
            babyTriggerItem={babyTriggerItem}
            level={level}
            isDarkMode={isDarkMode}
            screenSize={screenSize}
          />
        )}
        <hr />
        {!isPokeLoading && !isPokeSpeciesLoading && (
          <StatsTable
            statsInfo={statsInfo}
            screenSize={screenSize}
            isDarkMode={isDarkMode}
          />
        )}
        <hr />
        {!isPokeSpeciesLoading && (
          <EvolutionChain
            pokeSpeciesData={pokeSpeciesData}
            pokeChainURL={pokeSpeciesData.evolution_chain.url}
            whosThatPokemon={whosThatPokemon}
            setBabyTriggerItem={setBabyTriggerItem}
            setLevel={setLevel}
            screenSize={screenSize}
            isDarkMode={isDarkMode}
          />
        )}
        <hr />
        {!isPokeLoading && (
          <SpritesTable
            pokeData={pokeData}
            whosThatPokemon={whosThatPokemon}
            screenSize={screenSize}
            isDarkMode={isDarkMode}
          />
        )}
        {!isPokeLoading && !isPokeSpeciesLoading && (
          <NavButtons
            id={pokeSpeciesData.id}
            fullPokeResults={fullPokeResults}
            whosThatPokemon={whosThatPokemon}
            screenSize={screenSize}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
      <Footer isDarkMode={isDarkMode} screenSize={screenSize} />
    </>
  );
};

export default PokeView;
