import SearchBar from "./SearchBar";
import GenTable from "./GenTable";
// import TypesTable from "./TypesTable";
import { useState } from "react";
// import GenHero4 from "./GenHero4";

const HomeView = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <div className="fw-bolder text-center my-5 homeTitle">Pokémon Lookup</div>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      {/* <TypesTable /> */}
      <GenTable />
      {/* <GenHero4 /> */}
    </div>
  );
};

export default HomeView;
