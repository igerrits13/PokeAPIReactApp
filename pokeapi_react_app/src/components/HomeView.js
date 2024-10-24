import SearchBar from "./SearchBar";
import GenHero from "./GenHero";
// import { useState, useEffect } from "react";
import { useState } from "react";

const HomeView = () => {
  const [searchText, setSearchText] = useState("");

  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon?limit=-1`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  // https://pokeapi.co/api/v2/generation/1/
  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/generation/1/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.main_region.name);
  //     });
  // }, []);

  return (
    <div className="h-100">
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <GenHero />
      <h1>This is where the next line goes</h1>
    </div>
  );
};

export default HomeView;
