import NavButtonPrev from "./NavButtonPrev";
import NavButtonNext from "./NavButtonNext";

const NavButtons = ({ id, fullPokeResults }) => {
  return (
    <div className="nav-button-container">
      <NavButtonPrev id={Number(id) - 1} fullPokeResults={fullPokeResults} />
      <NavButtonNext id={Number(id) + 1} fullPokeResults={fullPokeResults} />
    </div>
  );
};

export default NavButtons;
