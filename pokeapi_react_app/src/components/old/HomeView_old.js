import { useState, useEffect } from "react";
import SearchBarOld from "./SearchBar_old";
import GenTable from "./GenTable_old";
import TypesTableOld from "./TypesTable_old";
import SortOptionsOld from "./SortOptions_old";

// Home view display for Pokémon lookup website
const HomeViewOld = () => {
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
      <SearchBarOld fullScreen={fullScreen} />
      <TypesTableOld fullScreen={fullScreen} />
      <SortOptionsOld />
      <GenTable />
    </div>
  );
};

export default HomeViewOld;
