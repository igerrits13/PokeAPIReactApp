const SortOptions = () => {
  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      Sort by:
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="option1"
          checked
        />
        <label className="form-check-label" for="inlineRadio1">
          Number
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="option2"
        />
        <label className="form-check-label" for="inlineRadio2">
          Name
        </label>
      </div>
    </div>
  );
};

export default SortOptions;
