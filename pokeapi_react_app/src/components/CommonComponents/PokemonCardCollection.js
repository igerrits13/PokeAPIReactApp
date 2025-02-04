import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBall from "./LoadingBall";
import PokemonCard from "./PokemonCard";

const PokemonCardCollection = ({
  commonElements,
  sortBy,
  screenSize,
  isDarkMode,
}) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";

  // Variable to hold how many cards will be displayed based on user scrolling
  const [cardsToDisplay, setCardsToDisplay] = useState(12);

  // Create a card for each Pokémon
  const cardsHTML = commonElements.map((obj, i) => {
    // Seperate out the integer from the url
    const urlArr = obj.url.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    const pokeNum = parseInt(urlNumber, 10);
    return (
      <PokemonCard key={i} obj={obj} i={pokeNum} isDarkMode={isDarkMode} />
    );
  });

  // Compare used for sorting the pokemon by number
  let compareNum = (a, b) => {
    if (cardsHTML[Number(a.key)].props.i < cardsHTML[Number(b.key)].props.i) {
      return -1;
    }
    if (cardsHTML[Number(a.key)].props.i > cardsHTML[Number(b.key)].props.i) {
      return 1;
    }
    return 0;
  };

  // Compare used for sorting the pokemon by name
  let compareName = (a, b) => {
    if (
      cardsHTML[Number(a.key)].props.obj.name <
      cardsHTML[Number(b.key)].props.obj.name
    ) {
      return -1;
    }
    if (
      cardsHTML[Number(a.key)].props.obj.name >
      cardsHTML[Number(b.key)].props.obj.name
    ) {
      return 1;
    }
    return 0;
  };

  // // Sort the cards based on name or number
  if (sortBy === "number") {
    cardsHTML.sort(compareNum);
  } else if (sortBy === "name") {
    cardsHTML.sort(compareName);
  }

  // Update how many cards are to be displayed
  const fetchMoreData = () => {
    setCardsToDisplay(cardsToDisplay + 24);
    // setCardsToDisplay(cardsToDisplay + 12);
  };

  return (
    <div>
      <div className={`sub-header ${fontStyle}`}>
        Pokémon ({commonElements.length})
      </div>
      <InfiniteScroll
        dataLength={cardsToDisplay}
        next={fetchMoreData}
        hasMore={cardsToDisplay < commonElements.length}
        loader={
          <div className="loading-ball-container">
            <LoadingBall />
          </div>
        }
        style={{ overflow: "hidden" }}
      >
        <div
          className={
            screenSize === "small"
              ? "pokemon-container-small"
              : screenSize === "medium"
              ? "pokemon-container-med"
              : screenSize === "large"
              ? "pokemon-container-large"
              : "pokemon-container-xlarge"
          }
          count={commonElements.length}
        >
          {cardsHTML.slice(0, cardsToDisplay)}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PokemonCardCollection;
