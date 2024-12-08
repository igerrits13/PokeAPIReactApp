import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import TypeseTable from "./TypesTable";

const HomeView = () => {
  return (
    <div className="homeview-container">
      {/* <div className="header">Pokémon Lookup</div> */}
      <div className="header"></div>
      {/* <Link to={"/old"}>Click me</Link> */}
      <SearchBar />
      <TypeseTable />
      <SortOptions />
    </div>
  );
};

export default HomeView;
