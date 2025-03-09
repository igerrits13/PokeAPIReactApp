import { motion } from "motion/react";

const BattleDisplayTextbox = ({ setMainSection, setSection, inputText }) => {
  const handleOnClick = () => {
    setMainSection(true);
    setSection(false);
  };

  const resText = inputText.split("");

  return (
    <div className="battle-display-info">
      <div className="battle-display-info-section font-light-pixel">
        <div
          className="battle-display-info-textbox"
          // onScroll={handleScroll}
        >
          {resText.map((char, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 20,
              }}
              key={i}
            >
              {char}
            </motion.span>
          ))}
          <motion.div
            className="battle-display-info-back"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 0.6,
              type: "tween",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
            onClick={handleOnClick}
          >
            Back
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BattleDisplayTextbox;
