import { Link } from "react-router-dom";

// Filter and display the search results based on search text
function SearchBar({ searchText, searchResults }) {
  let searchHTML;

  // Function to capitalize the first letter of each name
  function capitalizeFirstLetter(name) {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  }

  // Create search results for each pokemon species. If there is search text,
  // filter the results and display them in numbered order
  if (searchText !== "") {
    searchHTML = searchResults
      .filter((res) => res.name.includes(`${searchText.toLowerCase()}`))
      .map((obj, i) => {
        return (
          <Link className="dropdown-item" to="./" key={i}>
            {capitalizeFirstLetter(obj.name)}
          </Link>
        );
      });
  }
  // Otherwise, display all Pokémon in order
  else {
    searchHTML = searchResults.map((obj, i) => {
      return (
        <Link className="dropdown-item" to="./" key={i}>
          {capitalizeFirstLetter(obj.name)}
        </Link>
      );
    });
  }

  return (
    <div>
      {Object.keys(searchHTML).length === 0 ? (
        <Link className="dropdown-item disabled" to="./">
          No Pokémon Found
        </Link>
      ) : (
        // <div className="ms-3">No Pokémon Found</div>
        <div className="searchResults">{searchHTML.slice(0, 20)}</div>
      )}
    </div>
  );
  // <div className="searchResults">{searchHTML.slice(0, 20)}</div>;
}

export default SearchBar;

// import { Link } from "react-router-dom";

// // Filter and display the search results based on search text
// function SearchResults({ searchText, searchResults }) {
//   let searchHTML;

//   // Filter results if there is search text from the user
//   if (searchText !== "") {
//     // searchHTML = searchResults
//     const searchResultsList = searchResults.filter((res) =>
//       res.name.includes(`${searchText}`)
//     );
//     if (Object.keys(searchResultsList).length === 0) {
//       searchHTML = <></>;
//     } else
//       searchHTML = searchResultsList.map((obj, i) => {
//         return (
//           <Link className="dropdown-item" key={i} to="./">
//             {obj.name}
//           </Link>
//         );
//       });
//   } else {
//     searchHTML = searchResults.map((obj, i) => {
//       return (
//         <Link className="dropdown-item" key={i} to="./">
//           {obj.name}
//         </Link>
//       );
//     });
//   }

//   return <div className=" searchResults">{searchHTML.slice(0, 20)}</div>;
//   // return <></>;
// }

// export default SearchResults;
