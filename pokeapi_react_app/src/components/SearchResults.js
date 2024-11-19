import { Link } from "react-router-dom";

function SearchBar() {
  return (
    <div className="dataResult">
      <div>
        <Link to={"./"}>Item 1</Link>
      </div>
      <div>
        <Link to={"./"}>Item 2</Link>
      </div>
      <div>
        <Link to={"./"}>Item 3</Link>
      </div>
      <div>
        <Link to={"./"}>Item 4</Link>
      </div>
      <div>
        <Link to={"./"}>Item 5</Link>
      </div>
    </div>
  );
}

export default SearchBar;
