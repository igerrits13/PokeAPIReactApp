import { motion } from "motion/react";
import pokeBall from "../icons/poke-ball.png";

const LoadingBall = () => {
  return (
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
      className="loading-ball"
      src={pokeBall}
      alt={`Poké card loading`}
    />
  );
};

export default LoadingBall;
