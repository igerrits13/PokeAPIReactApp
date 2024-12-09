import { useState, useEffect } from "react";
import Footer from "./Footer";
import PokemonTable from "./PokemonTable";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import TypeseTable from "./TypesTable";

const HomeView = () => {
  const [screenSize, setscreenSize] = useState("large");

  // Check screen size to see if types table should collapse
  useEffect(() => {
    const handleScreenResize = () => {
      // Handle small screen
      if (window.innerWidth < 576) {
        setscreenSize("small");
      }

      // Handle medium screen
      else if (window.innerWidth >= 576 && window.innerWidth < 992) {
        setscreenSize("medium");
      }

      // Handle large screen
      else {
        setscreenSize("large");
      }
    };

    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  const containerSize =
    screenSize === "small"
      ? "homeview-small"
      : screenSize === "medium"
      ? "homeview-med"
      : "homeview-large";

  return (
    <div className={`homeview-container ${containerSize}`}>
      {screenSize === "small" ? (
        <div className="header header-small">Pokémon Lookup</div>
      ) : screenSize === "medium" ? (
        <div className="header header-med">Pokémon Lookup</div>
      ) : (
        <div className="header header-large">Pokémon Lookup</div>
      )}

      {/* {value > 10 ? (
        <p>Value is greater than 10</p>
      ) : value < 5 ? (
        <p>Value is less than 5</p>
      ) : (
        <p>Value is between 5 and 10</p>
      )} */}

      {/* <Link to={"/old"}>Click me</Link> */}
      <SearchBar />
      <TypeseTable screenSize={screenSize} />
      <SortOptions screenSize={screenSize} />
      <PokemonTable screenSize={screenSize} />
      <Footer />
    </div>
  );
};

export default HomeView;
