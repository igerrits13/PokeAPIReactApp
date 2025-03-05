const BattleDisplayInfo = ({ pokeData }) => {
  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  return (
    <div className="battle-display-info">
      <button className="battle-display-info-prompt font-light-pixel">
        <div className="battle-display-info-prompt-textbox">
          What will {getPokeName(pokeData.name)} do?
        </div>
      </button>
      <button className="battle-display-info-fight battle-display-info-item">
        Fight
      </button>
      <button className="battle-display-info-bag battle-display-info-item">
        Bag
      </button>
      <button className="battle-display-info-pokemon battle-display-info-item">
        Pokemon
      </button>
      <button className="battle-display-info-run battle-display-info-item">
        Run
      </button>
    </div>
  );
};

export default BattleDisplayInfo;
