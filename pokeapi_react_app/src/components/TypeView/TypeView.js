import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const TypeView = () => {
  // Setup data structures to store type data and ID of the current type
  const { id } = useParams();
  const [typeData, setTypeData] = useState([]);

  // Fetch data for the current type
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setTypeData(data);
      });
  }, [id]);

  return (
    <div>
      Here is the Type View. <Link to="/">Here</Link> is a button to go home!
      <p>This is for {typeData.name} type</p>
    </div>
  );
};

export default TypeView;
