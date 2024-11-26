import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import GenTable from "./GenTable";
import TypesTable from "./TypesTable";
import SortOptions from "./SortOptions";

// Home view display for Pokémon lookup website
const HomeView = () => {
  const [fullScreen, setFullScreen] = useState(false);

  // Check screen size to see if types table should collapse
  useEffect(() => {
    const handleFullScreen = () => {
      setFullScreen(window.innerWidth >= 576);
    };

    window.addEventListener("resize", handleFullScreen);
    handleFullScreen();
    return () => window.removeEventListener("resize", handleFullScreen);
  }, []);

  return (
    <div>
      <div className="fw-bolder text-center my-5 homeTitle">Pokémon Lookup</div>
      <SearchBar fullScreen={fullScreen} />
      <TypesTable fullScreen={fullScreen} />
      <SortOptions />
      <GenTable />
    </div>
  );
};

export default HomeView;
