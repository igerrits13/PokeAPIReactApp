import { Link } from "react-router-dom";

const SearchResultItemOld = ({ resultItem }) => {
  // Function to capitalize the first letter of each name
  function capitalizeFirstLetter(name) {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  }

  const parts = resultItem.url.split("/");
  const cleanedParts = parts.filter((part) => part !== "");
  const lastPart = cleanedParts[cleanedParts.length - 1];
  const number = parseInt(lastPart, 10);

  return (
    <Link className="dropdown-item" to="./">
      <div className="d-flex justify-content-between">
        <div className="w-15 d-flex align-items-center">
          <img
            className="img-fluid me-2"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
            alt={`${resultItem.name}`}
          />
          {capitalizeFirstLetter(resultItem.name)}
        </div>
        <div className="d-flex align-items-center">#{number}</div>
      </div>
    </Link>
  );
};

export default SearchResultItemOld;
