import { Link } from "react-router-dom";

const SearchItem = ({ resultItem, i }) => {
  // Function to capitalize the first letter of each name
  function capitalizeFirstLetter(name) {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  }

  const parts = resultItem.url.split("/");
  const cleanedParts = parts.filter((part) => part !== "");
  const lastPart = cleanedParts[cleanedParts.length - 1];
  const number = parseInt(lastPart, 10);

  return (
    <Link className="" to="./">
      <div className="">
        <div className="">
          <img
            className=""
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
            alt={`${resultItem.name}`}
          />
          {capitalizeFirstLetter(resultItem.name)}
        </div>
        <div className="">#{number}</div>
      </div>
    </Link>
  );
};

export default SearchItem;
