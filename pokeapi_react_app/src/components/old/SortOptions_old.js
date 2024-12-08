// Display options for how to sort the Pokémon within each generation
const SortOptionsOld = () => {
  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <div className="fs-5 fw-bolder my-2 me-1"> Sort by:</div>
      <div className="form-check">
        <input
          className="form-check-input mx-3"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Name
        </label>
      </div>
      <div className="form-check mx-3">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          checked
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Number
        </label>
      </div>
    </div>
  );
};

export default SortOptionsOld;
