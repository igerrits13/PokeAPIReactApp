import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import DynamicSortOptions from "../DynamicComponents/DynamicSortOptions";
import LoadingBall from "./LoadingBall";
import PokemonCard from "./PokemonCard";

// Collection of cards within the current filter and sort options
const PokemonCardCollection = ({
  commonElements,
  sortBy,
  sortOptions,
  screenSize,
  isDarkMode,
}) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Variable to hold how many cards will be displayed based on user scrolling
  const [cardsToDisplay, setCardsToDisplay] = useState(24);

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

  // Debounced version of fetchMoreData
  useEffect(() => {
    // Create the debounced version of fetchMoreData
    const debouncedFetchMoreData = debounce(() => {
      setCardsToDisplay((prevCount) => prevCount + 48);
    }, 100);

    // Add event listeners to trigger debounced function
    const scrollHandler = () => {
      debouncedFetchMoreData();
    };

    // Add event listener for scrolling
    window.addEventListener("scroll", scrollHandler);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      debouncedFetchMoreData.cancel();
    };
  }, []);

  // Display the current card collection using infinite scroll
  return (
    <div>
      <div className={`sub-header ${fontStyle}`}>
        Pokémon ({commonElements.length})
      </div>
      <DynamicSortOptions sortOptions={sortOptions} screenSize={screenSize} />
      <InfiniteScroll
        dataLength={cardsToDisplay}
        next={() => {}}
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
