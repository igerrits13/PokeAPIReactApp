import { motion } from "motion/react";
import pokeBall from "../icons/poke-ball.png";

const SpriteTableImageLoading = () => {
  return (
    <div className="spritestab-item" style={{ display: "flex" }}>
      <motion.img
        initial={{
          rotate: "0deg",
        }}
        animate={{
          rotate: "360deg",
        }}
        transition={{
          duration: 1,
          type: "spring",
          repeat: Infinity,
          repeatDelay: 0.8,
        }}
        className="sprites-table-img"
        src={pokeBall}
        alt={`Icon loading`}
      />
      Loading...
    </div>
  );
};

export default SpriteTableImageLoading;
