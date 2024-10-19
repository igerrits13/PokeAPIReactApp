const GenHero = () => {
  return (
    <div className="container d-flex justify-content-center">
      <div className="row w-100">
        <div className="col genLeft opacity-50 h-50">
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          ></img>
        </div>
        <div className="col genMid opacity-50 h-50">
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          ></img>
        </div>
        <div className="col genMid2 opacity-50 h-50">
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
          ></img>
        </div>
        <div className="col genRight opacity-50 h-50">
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default GenHero;
