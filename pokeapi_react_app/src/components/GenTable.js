// import { useEffect } from "react";
import GenSection from "./GenSection";

const GenTable = () => {
  // https://pokeapi.co/api/v2/generation/1/
  // const GenData = useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/generation/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data);
  //       // console.log(data.count);
  //       console.log("Fetch called!");
  //     });
  // }, []);

  const GenData = [];

  console.log(GenData);

  return (
    <div className="h-100">
      <div className="w-100 bg-warning">Warning</div>
      <GenSection GenData={GenData} />
      <h1 className="bg-warning my-4">Next line</h1>
      <GenSection GenData={GenData} />
    </div>
  );
};

export default GenTable;
