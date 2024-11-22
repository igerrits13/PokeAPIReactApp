import { Link } from "react-router-dom";

// Filter and display the search results based on search text
function SearchResults({ searchText, searchResults }) {
  let searchHTML;

  // Filter results if there is search text from the user
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

export default SearchResults;
