import { Link } from "react-router-dom";

// Display the cards for all Pokémon within the current generation
const GenDisplay = ({ currGen }) => {
  // Create a card for each Pokémon within the current generation
  const currGenHTML = currGen.map((obj, i) => {
    // Seperate out the integer from the url
    const parts = obj.url.split("/");
    const cleanedParts = parts.filter((part) => part !== "");
    const lastPart = cleanedParts[cleanedParts.length - 1];
    const number = parseInt(lastPart, 10);

    return (
      <div className="col-lg-3 col-med-3 col-6 my-4" key={number}>
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

    // return (
    //   <div className="carousel-item active" key={number}>
    //     <div className="col-lg-3 col-med-3 col-6 my-4 d-block w-50">
    //       <div className="card">
    //         <img
    //           src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
    //           className="card-img-top"
    //           alt="..."
    //         />
    //         <div className="card-body">
    //           <h5 className="card-title">{obj.name} - title </h5>
    //           <p className="card-text">{obj.name} - text</p>
    //           <Link to="./" className="btn btn-primary">
    //             {number}
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  });

  // Compare used for sorting the pokemon by number for each gen
  let compare = (a, b) => {
    if (Number(a.key) < Number(b.key)) {
      return -1;
    }
    if (Number(a.key) > Number(b.key)) {
      return 1;
    }
    return 0;
  };

  // Sort the gen data based on each Pokémon's number
  currGenHTML.sort(compare);

  return (
    <div className="container">
      <div className="row">{currGenHTML}</div>
    </div>
  );
};

export default GenDisplay;
