import SearchBar from "./SearchBar";

const HomeView = () => {
  const GenHero = () => {
    return (
      <div className="containter">
        <div className="container-md d-flex justify-content-center my-5">
          <div className="row align-items-center w-75">
            {/* <div className="col-lg genLeft opacity-25"> */}
            <div className="col-lg genLeft">
              <img
                className="img-fluid"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              ></img>
            </div>
            <div className="col-lg genMid">
              {" "}
              <img
                className="img-fluid"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
              ></img>
            </div>
            <div className="col-lg genMid2">
              {" "}
              <img
                className="img-fluid"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
              ></img>
            </div>
            <div className="col-lg genRight">
              {" "}
              <img
                className="img-fluid"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <SearchBar />
      <GenHero />
    </div>
  );
};

export default HomeView;
