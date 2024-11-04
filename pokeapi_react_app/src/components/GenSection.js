import GenDisplay from "./GenDisplay";
import GenHero from "./GenHero";

const GenSection = () => {
  return (
    <div className="h-75 py-3 bg-light">
      <GenHero />
      <GenDisplay />
    </div>
  );
};

export default GenSection;
