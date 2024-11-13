import SearchBar from "./SearchBar";
import GenTable from "./GenTable";
import TypesTable from "./TypesTable";
import { useState } from "react";

const HomeView = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <div className="fw-bolder text-center my-5 homeTitle">Pokémon Lookup</div>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <TypesTable />
      <GenTable />
    </div>
  );
};

export default HomeView;
