import { Link } from "react-router-dom";

const GenDisplay = ({ currGen }) => {
  const currGenHTML = currGen.map((obj, i) => {
    // Split the link by '/'
    const parts = obj.url.split("/");
    // Remove empty elements from the end (due to trailing '/')
    const cleanedParts = parts.filter((part) => part !== "");
    // Get the last part
    const lastPart = cleanedParts[cleanedParts.length - 1];
    // Convert to a number
    const number = parseInt(lastPart, 10);

    return (
      <div className="col-lg-3 col-med-3 col-6 my-4" key={i}>
        <div className="card">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{obj.name} - title </h5>
            <p className="card-text">{obj.name} - text</p>
            <Link to="./" className="btn btn-primary">
              {number}
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{currGenHTML}</div>
    </div>
  );
};

export default GenDisplay;
