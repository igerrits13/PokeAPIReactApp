// import { motion } from "motion/react";
import TypesResultsItem from "./TypesResultsItem";

const TypesResults = ({ typesResults, getTypeIcon }) => {
  const typesHTML = typesResults
    .slice(0, typesResults.length - 2)
    .map((obj, i) => {
      const [typeIcon, typeStyle] = getTypeIcon(obj.name);
      return (
        <TypesResultsItem
          key={i}
          obj={obj}
          typeIcon={typeIcon}
          typeStyle={typeStyle}
        />
      );
    });

  return (
    <div>
      <div className="sub-header">Types</div>
      <div className="types-table">{typesHTML}</div>
    </div>
  );
};

export default TypesResults;
