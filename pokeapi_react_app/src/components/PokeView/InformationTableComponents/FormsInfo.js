import DynamicTableSection from "../../CommonComponents/DynamicComponents/DynamicTableSection";
import FormsInfoForms from "./FormsInfoForms";
import FormsInfoVarieties from "./FormsInfoVarieties";

// Forms information section for the current Pokémon
const FormsInfo = ({
  pokeData,
  setPokeId,
  pokeSpeciesData,
  screenSize,
  isDarkMode,
}) => {
  // Setup the page font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  // Data structure to store the forms information for the current Pokémon
  const formInfo = [
    {
      text: "Default Form",
      info: pokeData.is_default === true ? "True" : "False",
      id: 0,
    },
    {
      text: "Form Descriptions",
      info:
        pokeSpeciesData.form_descriptions.find(
          (obj) => obj.language.name === "en"
        )?.description ?? "None",
      id: 1,
    },
    {
      text: "Can Switch Forms",
      info: pokeSpeciesData.forms_switchable === true ? "True" : "False",
      id: 2,
    },
    {
      text: "Alternate Forms",
      info: <FormsInfoForms pokeData={pokeData} isDarkMode={isDarkMode} />,
      id: 3,
    },
    {
      text: "Varieties",
      info: (
        <FormsInfoVarieties
          pokeData={pokeData}
          pokeSpeciesData={pokeSpeciesData}
          setPokeId={setPokeId}
          isDarkMode={isDarkMode}
        />
      ),
      id: 4,
    },
  ];

  // Display the forms information for the current Pokémon
  return (
    <div
      className={`${
        screenSize === "large"
          ? "secondary-table-conainer-50"
          : "secondary-table-conainer-30"
      }`}
    >
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Forms</div>
      <DynamicTableSection sectionInfo={formInfo} isDarkMode={isDarkMode} />
    </div>
  );
};

export default FormsInfo;
