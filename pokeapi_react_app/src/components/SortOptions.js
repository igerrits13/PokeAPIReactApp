const SortOptions = ({ screenSize }) => {
  if (screenSize === "small") {
    return (
      <div className="sortoptions-container-small">
        <div className="sortoptions-item sortoption-text">
          <label htmlFor="generation">Filter by Generation</label>
          <select name="generation" id="generation">
            <option value="volvo">All</option>
            <option value="volvo">Gen 1</option>
            <option value="saab">Gen 2</option>
            <option value="saab">Gen 3</option>
            <option value="saab">Gen 4</option>
            <option value="saab">Gen 5</option>
          </select>
        </div>
        <div className="sortoptions-item sortoption-text">
          <label htmlFor="types">Filter by Type</label>
          <select name="types" id="types">
            <option value="volvo">All</option>
            <option value="volvo">Fire</option>
            <option value="saab">Ice</option>
            <option value="saab">Normal</option>
            <option value="saab">Ghost</option>
            <option value="saab">Sand</option>
          </select>
        </div>
        <div className="sortoptions-item sortoption-text">
          <label htmlFor="sortby">Sort by</label>
          <select name="sortby" id="sortby">
            <option value="volvo">Number</option>
            <option value="volvo">Name</option>
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div className="sortoptions-container-med-large">
        <div className="sortoptions-item sortoption-text">
          <label htmlFor="generation">Filter by Generation</label>
          <select name="generation" id="generation">
            <option value="volvo">All</option>
            <option value="volvo">Gen 1</option>
            <option value="saab">Gen 2</option>
            <option value="saab">Gen 3</option>
            <option value="saab">Gen 4</option>
            <option value="saab">Gen 5</option>
          </select>
        </div>
        <div className="sortoptions-item sortoption-text">
          <label htmlFor="types">Filter by Type</label>
          <select name="types" id="types">
            <option value="volvo">All</option>
            <option value="volvo">Fire</option>
            <option value="saab">Ice</option>
            <option value="saab">Normal</option>
            <option value="saab">Ghost</option>
            <option value="saab">Sand</option>
          </select>
        </div>
        <div className="sortoptions-item sortoption-text">
          <label htmlFor="sortby">Sort by</label>
          <select name="sortby" id="sortby">
            <option value="volvo">Number</option>
            <option value="volvo">Name</option>
          </select>
        </div>
      </div>
    );
  }
};

export default SortOptions;
