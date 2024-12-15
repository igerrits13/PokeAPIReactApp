import APILogo from "./icons/PokeAPILogo.svg";

// Website footer
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer-container">
      <div className="footer-item-1">
        <a
          className=""
          href="https://github.com/igerrits13"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
        >
          <i className="fa-brands fa-github github-logo"></i>
        </a>
      </div>
      <div className="footer-item-2">
        &copy; Designed and developed by{" "}
        <a href="mailto:igerrits@yahoo.com">Ian Gerrits</a> {currentYear}{" "}
      </div>
      <div className="footer-item-3">
        All data from
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
          aria-label="PokeAPI"
        >
          <img className="api-logo" src={`${APILogo}`} alt={`API Logo`} />
        </a>
      </div>
      <div className="footer-item-4">
        Pokémon is a registered trademark of Nintendo, Game Freak, and Creatures
      </div>
    </div>
  );
};

export default Footer;
