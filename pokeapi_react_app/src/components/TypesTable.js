import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BugType from "./icons/bug.svg";
import DarkType from "./icons/dark.svg";
import DragonType from "./icons/dragon.svg";
import ElectricType from "./icons/electric.svg";
import FairyType from "./icons/fairy.svg";
import FightingType from "./icons/fighting.svg";
import FireType from "./icons/fire.svg";
import FlyingType from "./icons/flying.svg";
import GhostType from "./icons/ghost.svg";
import GrassType from "./icons/grass.svg";
import GroundType from "./icons/ground.svg";
import IceType from "./icons/ice.svg";
import NormalType from "./icons/normal.svg";
import PoisonType from "./icons/poison.svg";
import PsychicType from "./icons/psychic.svg";
import RockType from "./icons/rock.svg";
import SteelType from "./icons/steel.svg";
import WaterType from "./icons/water.svg";

const TypseTable = () => {
  const [typesResults, setTypesResult] = useState([]);
  let typeStyle = "";

  // Fetch the types for the buttons
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/?limit=-1`)
      .then((response) => response.json())
      .then((data) => {
        setTypesResult(data.results);
      });
  }, []);

  // Set the type attributes for the current button
  function getTypeIcon(typeName) {
    switch (typeName) {
      case "bug":
        typeStyle = "bugType";
        return BugType;
      case "dark":
        typeStyle = "darkType";
        return DarkType;
      case "dragon":
        typeStyle = "dragonType";
        return DragonType;
      case "electric":
        typeStyle = "electricType";
        return ElectricType;
      case "fairy":
        typeStyle = "fairyType";
        return FairyType;
      case "fighting":
        typeStyle = "fightingType";
        return FightingType;
      case "fire":
        typeStyle = "fireType";
        return FireType;
      case "flying":
        typeStyle = "flyingType";
        return FlyingType;
      case "ghost":
        typeStyle = "ghostType";
        return GhostType;
      case "grass":
        typeStyle = "grassType";
        return GrassType;
      case "ground":
        typeStyle = "groundType";
        return GroundType;
      case "ice":
        typeStyle = "iceType";
        return IceType;
      case "normal":
        typeStyle = "normalType";
        return NormalType;
      case "poison":
        typeStyle = "poisonType";
        return PoisonType;
      case "psychic":
        typeStyle = "psychicType";
        return PsychicType;
      case "rock":
        typeStyle = "rockType";
        return RockType;
      case "steel":
        typeStyle = "steelType";
        return SteelType;
      case "water":
        typeStyle = "waterType";
        return WaterType;
      default:
        return null;
    }
  }

    // Create buttons for each type
    const typesHTML = typesResults.map((obj, i) => {
      const typeIcon = getTypeIcon(obj.name);
      if (obj.name !== "unknown" && obj.name !== "stellar") {
        return (
          <Link key={i} to="./">
            <button className={`m-2 fs-6 fw-bold type-item ${typeStyle}`}>
              <img
                className="me-2 typeBtnImg"
                // className="type-img"
                src={typeIcon}
                alt={`${obj.name} type icon`}
              ></img>
              {obj.name.toUpperCase()}
            </button>
          </Link>
        );
      } else {
        return <div key={i}></div>;
      }
    });


  return (
    <div>
      <div className="sub-header">
        Types
      </div>
      <div className="types-table">
        {typesHTML}
      </div>
    </div>
  );
};

export default TypseTable;
