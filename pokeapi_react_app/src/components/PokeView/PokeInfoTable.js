import DynamicTableSection from "../CommonComponents/DynamicTableSection";

const PokeInfoTable = ({
  pokeData,
  pokeSpeciesData,
  isPokeLoading,
  isDarkMode,
  screenSize,
}) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getGenerationTitle = (generation) => {
    let genTitle = generation.split("-");
    genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    genTitle[1] = genTitle[1].toUpperCase();
    return genTitle.join(" ");
  };

  const getHeight = (height) => {
    const metric = height / 10;
    const imperial = height * 3.93701;
    const feet = Math.floor(imperial / 12);
    const inches = Math.floor(imperial % 12);
    return `${metric}m (${feet}' ${inches}")`;
  };

  const getWeight = (weight) => {
    const metric = weight * 0.1;
    const imperial = weight * 0.220462;
    return `${metric}kg (${imperial.toFixed(1)} lbs)`;
  };

  // Lines to be displayed for the basic type information table. Only add move damage class if it is not null
  const pokeInfo = [
    { text: "Pokémon ID", info: `#${pokeData.id}`, id: 0 },
    {
      text: "Generation",
      info: `${getGenerationTitle(pokeSpeciesData.generation.name)}`,
      id: 1,
    },
    // {
    //   text: "Description",
    //   info: `${
    //     pokeSpeciesData.flavor_text_entries[0].flavor_text
    //     //   .replace(
    //     //   "/n",
    //     //   " "
    //     // )
    //   }`,
    //   id: 2,
    // },
    { text: "Height", info: `${getHeight(pokeData.height)}`, id: 2 },
    { text: "Weight", info: `${getWeight(pokeData.weight)}`, id: 3 },
    {
      text: "Shape",
      info: `${
        pokeSpeciesData.shape.name[0].toUpperCase() +
        pokeSpeciesData.shape.name.slice(1)
      }`,
      id: 4,
    },
    {
      text: "Habitat",
      info: `${
        pokeSpeciesData.habitat.name[0].toUpperCase() +
        pokeSpeciesData.habitat.name.slice(1)
      }`,
      id: 5,
    },
    {
      text: "Color",
      info: `${
        pokeSpeciesData.color.name[0].toUpperCase() +
        pokeSpeciesData.color.name.slice(1)
      }`,
      id: 6,
    },
  ];

  return (
    <div
      className={`${
        screenSize === "small" || screenSize === "medium"
          ? "secondary-grid-row-small-med"
          : "secondary-grid-row-large"
      } ${fontStyle}`}
    >
      <div className="secondary-table-conainer-50">
        <DynamicTableSection sectionInfo={pokeInfo} isDarkMode={isDarkMode} />
      </div>
      <div className="secondary-table-conainer-50">
        {/* {console.log(
          `${pokeData.sprites.other.official - artwork.front_default}`
        )} */}
        <img
          className="pokeview-image-container"
          src={pokeData.sprites.other["official-artwork"].front_default}
        ></img>
      </div>
    </div>
  );
};

export default PokeInfoTable;
