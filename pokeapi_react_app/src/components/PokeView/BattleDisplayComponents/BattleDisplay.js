import BattleDisplayInfo from "./BattleDisplayInfo";

const BattleDisplay = ({ pokeData, whosThatPokemon }) => {
  return (
    <div className="battle-display-container">
      {/* Field for the pokemon to battle, display for Pokemon options */}
      <BattleDisplayInfo
        pokeData={pokeData}
        whosThatPokemon={whosThatPokemon}
      />
    </div>
  );
};

export default BattleDisplay;
