import DynamicTableSection from "../CommonComponents/DynamicTableSection";

// Training information section for the current Pokémon
const TrainingInfo = ({
  pokeData,
  pokeSpeciesData,
  screenSize,
  isDarkMode,
}) => {
  // Setup the font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  // Data structure to store the training information for the current Pokémon
  const trainingInfo = [
    { text: "Base XP", info: `${pokeData.base_experience} XP`, id: 0 },
    {
      text: "Base Happiness",
      info: `${pokeSpeciesData.base_happiness} (${(
        (pokeSpeciesData.base_happiness / 255) *
        100
      ).toFixed(0)}% Happy)`,
      id: 1,
    },
    {
      text: "Capture Rate",
      info: `${pokeSpeciesData.capture_rate} (${(
        (pokeSpeciesData.capture_rate / 255) *
        100
      ).toFixed(0)}% Chance)`,
      id: 2,
    },
  ];

  // Display the training information for the current Pokémon
  return (
    <div
      className={`${
        screenSize === "large"
          ? "secondary-table-conainer-50"
          : "secondary-table-conainer-30"
      }`}
    >
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Training</div>
      <DynamicTableSection sectionInfo={trainingInfo} isDarkMode={isDarkMode} />
    </div>
  );
};

export default TrainingInfo;
