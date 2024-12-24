import { motion } from "motion/react";
import DynamicSvgIcon from "./DynamicSvgIcon";

const TypesResultsItem = ({ obj, typeIcon, typeStyle }) => {
  return (
    // <typeIcon className={`type-img ${typeStyle}`} />

    <motion.button
      className="type-item hover-dim"
      whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
      whileTap={{ scale: 0.9, rotate: "5deg" }}
      transition={{ duration: 0.1 }}
    >
      <DynamicSvgIcon
        classes={`type-img ${typeStyle}`}
        IconComponent={typeIcon}
      />
      {/* <img
        className={`type-img ${typeStyle}`}
        src={typeIcon}
        alt={`${obj.name} type icon`}
      ></img> */}
      <div className="type-text">{obj.name.toUpperCase()}</div>
    </motion.button>
  );
};

export default TypesResultsItem;
