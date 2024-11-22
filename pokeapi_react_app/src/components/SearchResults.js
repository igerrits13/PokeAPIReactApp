import { Link } from "react-router-dom";

function SearchBar({ searchText, searchResults }) {
  let searchHTML;

  // Create search results for each pokemon species
  if (searchText !== "") {
    // searchHTML = searchResults
    const searchResultsList = searchResults.filter((res) =>
      res.name.includes(`${searchText}`)
    );
    if (Object.keys(searchResultsList).length === 0) {
      searchHTML = <></>;
    } else;
    searchHTML = searchResultsList.map((obj, i) => {
      return (
        <Link className="dropdown-item" key={i} to="./">
          {obj.name}
        </Link>
      );
    });
  } else {
    searchHTML = searchResults.map((obj, i) => {
      return (
        <Link className="dropdown-item" key={i} to="./">
          {obj.name}
        </Link>
      );
    });
  }

  return <div className=" searchResults">{searchHTML.slice(0, 20)}</div>;
  // return <></>;
}

export default SearchBar;
