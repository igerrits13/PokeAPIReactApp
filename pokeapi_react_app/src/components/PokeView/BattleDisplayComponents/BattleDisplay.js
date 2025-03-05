import BattleDisplayInfo from "./BattleDisplayInfo";

const BattleDisplay = ({ pokeData, isNormalToggle }) => {
  return (
    <div className="battle-display-container">
      {/* Field for the pokemon to battle, display for Pokemon options */}
      <BattleDisplayInfo pokeData={pokeData} />
    </div>
  );
};

export default BattleDisplay;
