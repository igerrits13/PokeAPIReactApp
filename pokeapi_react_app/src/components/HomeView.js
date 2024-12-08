import { useState, useEffect } from "react";
import Footer from "./Footer";
// import PokemonTable from "./PokemonTable";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import TypeseTable from "./TypesTable";

const HomeView = () => {
  const [screenSize, setscreenSize] = useState("large");


  // Check screen size to see if types table should collapse
  useEffect(() => {
    const handleScreenResize = () => {
      // Handle small screen
      if(window.innerWidth < 576) {
        setscreenSize("small")
      }

      // Handle medium screen
      else if(window.innerWidth >= 576 && window.innerWidth < 992) {
        setscreenSize("medium")
      }

      // Handle large screen
      else {
        setscreenSize("large")
      }
    };

    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return (
    <div className="homeview-container">
      {/* <div className="header">Pokémon Lookup</div> */}
      <div className="header"></div>
      {/* <Link to={"/old"}>Click me</Link> */}
      <SearchBar />
      <TypeseTable screenSize={screenSize} />
      <SortOptions screenSize={screenSize} />
      {/* <PokemonTable screenSize={screenSize} /> */}
      <Footer />
    </div>
  );
};

export default HomeView;
