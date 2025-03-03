import { useState } from "react";
import SpriteTableImageLoading from "./SpriteTableImageLoading";

const SpriteTableImage = ({
  pokeData,
  getPokeName,
  whosThatPokemon,
  spriteUrl,
  description,
}) => {
  // Set and update loading state to show the loaded card when the image has finished loading in
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      {!isImageLoaded && <SpriteTableImageLoading />}
      <div
        className="spritestab-item"
        style={{ display: isImageLoaded ? "flex" : "none" }}
      >
        <img
          src={spriteUrl}
          alt={getPokeName(pokeData.name)}
          className={`sprites-table-img ${
            whosThatPokemon ? "pokeview-image-dark" : ""
          }`}
          onLoad={handleImageLoad}
        />
        {description}
      </div>
    </>
  );
};
export default SpriteTableImage;
