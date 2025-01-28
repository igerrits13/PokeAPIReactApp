const PokeInfo = ({
  pokeData,
  pokeSpeciesData,
  isPokeLoading,
  isDarkMode,
  screenSize,
}) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Seperate the generation title by '-' and capitalize appropriate letters
  // const getGenerationTitle = (generation) => {
  //   let genTitle = generation.split("-");
  //   genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
  //   genTitle[1] = genTitle[1].toUpperCase();
  //   return genTitle.join(" ");
  // };

  // Lines to be displayed for the basic type information table. Only add move damage class if it is not null
  // const pokeInfo = [
  //   { text: "Pokémon ID", info: `#${pokeData.id}`, id: 0 },
  //   {
  //     text: "Generation",
  //     info: `${getGenerationTitle(pokeSpeciesData.generation.name)}`,
  //     id: 1,
  //   },
  //   {
  //     text: "Description",
  //     info: `${pokeSpeciesData.flavor_text_entries[0].flavor_text.replace(
  //       "/n",
  //       " "
  //     )}`,
  //     id: 2,
  //   },
  // ];

  return (
    !isPokeLoading && (
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "pokeview-table-small-med"
            : "pokeview-table-large"
        } ${fontStyle}`}
      >
        <div className="">Here is info</div>
        <div>Here is another div</div>
      </div>
    )
  );
};

export default PokeInfo;
