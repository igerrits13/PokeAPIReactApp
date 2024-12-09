import { Link } from "react-router-dom";

const PokemonTable = ({ screenSize }) => {
  const dataHTML = (
    <>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/49.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/67.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
      <Link className="pokemon-card">
        <img
          className="pokemon-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Ditto"
        />
        <div className="pokemon-card-info">
          <p>#132</p>
          <div className="sub-header">Ditto</div>
        </div>
      </Link>
    </>
  );

  if (screenSize === "small") {
    return <div className="pokemon-container-small">{dataHTML}</div>;
  } else if (screenSize === "medium") {
    return <div className="pokemon-container-med">{dataHTML}</div>;
  } else {
    return <div className="pokemon-container-large">{dataHTML}</div>;
  }
};

export default PokemonTable;
