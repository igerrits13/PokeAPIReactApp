import { useState, useEffect } from "react";
import SearchBar from "./SearchBar_old";
import GenTable from "./GenTable_old";
import TypesTable from "./TypesTable_old";
import SortOptions from "./SortOptions_old";

// Home view display for Pokémon lookup website
const HomeView_old = () => {
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

export default HomeView_old;
