// Website title
const Title = ({ screenSize }) => {
  return (
    <>
      {screenSize === "small" ? (
        <div className="header header-small">Pokémon Lookup</div>
      ) : screenSize === "medium" ? (
        <div className="header header-med">Pokémon Lookup</div>
      ) : screenSize === "large" ? (
        <div className="header header-large">Pokémon Lookup</div>
      ) : <div className="header header-x-large">Pokémon Lookup</div>}
    </>
  );
};

export default Title;
