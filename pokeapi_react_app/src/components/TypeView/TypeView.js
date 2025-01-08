import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PokemonCardCollection from "../CommonComponents/PokemonCardCollection";
import Footer from "../CommonComponents/Footer";

const TypeView = ({ sortBy, screenSize, isDarkMode }) => {
  // Setup data structures to store type data and ID of the current type
  const { id } = useParams();
  const [typeData, setTypeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Setup the title font style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";

  // Fetch data for the current type
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setTypeData(data);
        setIsLoading(false);
      });
  }, [id]);

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "typeview-small"
      : screenSize === "medium"
      ? "typeview-med"
      : "typeview-large";

  // Create a set of Pokémon of the current type and use set to prevent duplicates
  let commonElementsSet = new Set();

  if (!isLoading) {
    for (const element of typeData.pokemon) {
      const urlArr = element.pokemon.url.split("/");
      const urlNoSlash = urlArr.filter((part) => part !== "");
      const urlNumber = urlNoSlash[urlNoSlash.length - 1];
      if (urlNumber <= 1025) {
        commonElementsSet.add(element.pokemon);
      }
    }
  }

  // Convert the set back to an array of all the Pokémon that are to be displayed
  let commonElements;

  commonElements = Array.from(commonElementsSet);

  const typeViewHtml = (
    <div
      className={`typeview-container ${containerSize} ${fontStyle} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      Here is the Type View. <Link to="/">Here</Link> is a button to go home!
      <p>This is for {typeData.name} type</p>
      <p>One more line before Pokémon</p>
      <PokemonCardCollection
        commonElements={commonElements}
        sortBy={sortBy}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );

  return <>{typeViewHtml}</>;
};

export default TypeView;
