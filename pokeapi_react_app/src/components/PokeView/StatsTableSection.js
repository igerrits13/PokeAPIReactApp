import { motion } from "motion/react";

// Create a table section based on the input array of information
const StatsTableSection = ({ statsInfo, screenSize, isDarkMode }) => {
  // Setup the line styling between information sections based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const lineStyle = isDarkMode
    ? "component-outline-bottom-dark"
    : "component-outline-bottom-light";
  const progressBarOutline = isDarkMode
    ? "component-outline-dark"
    : "component-outline-light";
  const progressBarMinStyle = isDarkMode
    ? "stats-progress-dark-min"
    : "stats-progress-light-min";
  const progressBarMaxStyle = isDarkMode
    ? "stats-progress-dark-max"
    : "stats-progress-light-max";

  //  Get the min and max total stats the current Pokémon can obtain
  const calcMin = (obj) => {
    if (obj.name === "hp") {
      return 2 * obj.base + 110;
    } else {
      return (2 * obj.base + 5) * 0.9;
    }
  };

  const calcMax = (obj) => {
    if (obj.name === "hp") {
      return 2 * obj.base + 110 + 31 + 63;
    } else {
      return (2 * obj.base + 31 + 63 + 5) * 1.1;
    }
  };

  // Return the name of the current game in formatted form
  const getStatTitle = (stat) => {
    if (stat === "hp") return "HP";
    return stat
      .split(/[\s-]/)
      .map(
        (currWord) =>
          currWord.charAt(0).toUpperCase() + currWord.slice(1).toLowerCase()
      )
      .join(" ");
  };

  // Display the section based on the input array. Add lines between items, but not after the last item
  return (
    <>
      {statsInfo.map((obj) => {
        return (
          <div
            key={obj.id}
            className={`stats-table-section ${fontStyle} ${
              obj.id !== statsInfo.length - 1 ? lineStyle : ""
            }`}
          >
            <div className="stats-table-name">{getStatTitle(obj.name)}</div>
            <div className="stats-table-number">{obj.base}</div>
            <div
              className={`stats-table-progress-bar ${
                !isNaN(obj.base) ? progressBarOutline : ""
              }`}
            >
              {!isNaN(obj.base) ? (
                <>
                  <motion.div
                    initial={{ width: "0" }}
                    animate={{
                      width: `${(obj.base / calcMin(obj).toFixed(0)) * 100}%`,
                    }}
                    transition={{ duration: 1.4, origin: 1 }}
                    className={`stats-progress-base ${progressBarMinStyle}`}
                  ></motion.div>

                  <motion.div
                    initial={{ width: "0" }}
                    animate={{
                      width: `${(obj.base / calcMax(obj).toFixed(0)) * 100}%`,
                    }}
                    transition={{ duration: 1.4, origin: 1 }}
                    className={`stats-progress-base ${progressBarMaxStyle}`}
                  ></motion.div>
                </>
              ) : (
                <>
                  <div className="stats-progress-example-container">
                    <div
                      className={`stats-progress-example ${progressBarMinStyle}`}
                    >
                      Base/Min
                    </div>
                    <div
                      className={`stats-progress-example ${progressBarMaxStyle}`}
                    >
                      Base/Max
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="stats-table-number">
              {obj.fullMin ? obj.fullMin : calcMin(obj).toFixed(0)}
            </div>
            <div className="stats-table-number">
              {obj.fullMax ? obj.fullMax : calcMax(obj).toFixed(0)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default StatsTableSection;
