import SearchBar from "./SearchBar";
import GenTable from "./GenTable";
import TypesTable from "./TypesTable";
// import SearchResults from "./SearchResults";
// import SortOptions from "./SortOptions";
// import { useState } from "react";

const HomeView = () => {
  return (
    <div>
      <div className="fw-bolder text-center my-5 homeTitle">Pokémon Lookup</div>
      <SearchBar />
      <TypesTable />
      {/* <SortOptions /> */}
      <GenTable />
    </div>
  );
};

export default HomeView;
