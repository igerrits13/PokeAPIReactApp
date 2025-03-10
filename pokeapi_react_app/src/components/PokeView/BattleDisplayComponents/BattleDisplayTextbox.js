import { motion } from "motion/react";

// Text display for the battle view
const BattleDisplayTextbox = ({ setMainSection, setSection, inputText }) => {
  // Handle click navigation betweeen battle view button options
  const handleOnClick = () => {
    setMainSection(true);
    setSection(false);
  };

  // Split the text to be displayed into an array for animating
  const resText = inputText.split("");

  // Display the battle view text box with animated text
  return (
    <div className="battle-display-info">
      <div className="battle-display-info-section font-light-pixel">
        <div className="battle-display-info-textbox">
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
