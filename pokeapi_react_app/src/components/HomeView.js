import SearchBar from "./SearchBar";
// import GenTable from "./GenTable";
// import TypesTable from "./TypesTable";
import TestDisplay from "./TestDisplay";
import { useState } from "react";

const HomeView = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <div className="fw-bolder text-center my-5 homeTitle">Pokémon Lookup</div>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      {/* <TypesTable /> */}
      {/* <GenTable /> */}
      <TestDisplay />
    </div>
  );
};

export default HomeView;
