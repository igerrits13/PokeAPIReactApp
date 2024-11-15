import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Display the cards for all Pokémon within the current generation
const GenDisplay = ({ currGen }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [midScreen, setMidScreen] = useState(false);

  // Check screen size to see how many cards should be visible 992, 576
  useEffect(() => {
    const handleFullScreen = () => {
      setFullScreen(window.innerWidth >= 992);
      setMidScreen(window.innerWidth < 992 && window.innerWidth >= 576);
    };

    window.addEventListener("resize", handleFullScreen);
    handleFullScreen();
    return () => window.removeEventListener("resize", handleFullScreen);
  }, []);

  // Create a card for each Pokémon within the current generation
  const currGenHTML = currGen.map((obj, i) => {
    // Seperate out the integer from the url
    const parts = obj.url.split("/");
    const cleanedParts = parts.filter((part) => part !== "");
    const lastPart = cleanedParts[cleanedParts.length - 1];
    const number = parseInt(lastPart, 10);

    // return (
    //   <div className="col-lg-3 col-med-3 col-6 my-4" key={number}>
    //     <div className="card">
    //       <img
    //         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
    //         className="card-img-top"
    //         alt="..."
    //       />
    //       <div className="card-body">
    //         <h5 className="card-title">{obj.name} - title </h5>
    //         <p className="card-text">{obj.name} - text</p>
    //         <Link to="./" className="btn btn-primary">
    //           {number}
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // );

    // return (
    //   <div key={number}>
    //     <div className={`carousel-item ${number === 1 ? `active` : ``}`}>
    //       {/* <div className="col-lg-3 col-med-3 col-6 my-4" key={number}> */}
    //       <div key={number}>
    //         <div className="card">
    //           <img
    //             src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
    //             alt={`${obj.name} card`}
    //           />
    //           <div className="card-body">
    //             <h5 className="card-title">{obj.name} - title </h5>
    //             <p className="card-text">{obj.name} - text</p>
    //             <Link to="./" className="btn btn-primary">
    //               {number}
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );

    return (
      <div key={number} className="card">
        <img
          className="w-100"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
          alt={`${obj.name} card`}
        />
        <div className="card-body">
          <h5 className="card-title">{obj.name} - title </h5>
          <p className="card-text">{obj.name} - text</p>
          <Link to="./" className="btn btn-primary">
            {number}
          </Link>
        </div>
      </div>
    );
  });

  // Compare used for sorting the pokemon by number for each gen
  let compare = (a, b) => {
    if (Number(a.key) < Number(b.key)) {
      return -1;
    }
    if (Number(a.key) > Number(b.key)) {
      return 1;
    }
    return 0;
  };

  // Sort the gen data based on each Pokémon's number
  currGenHTML.sort(compare);

  // return (
  //   <div className="container">
  //     <div className="row">{currGenHTML}</div>
  //   </div>
  // );

  // return (
  //   <div id="carouselExample" className="carousel slide my-5 w-85 mx-auto">
  //     <div className="carousel-inner">{currGenHTML}</div>
  //     <button
  //       className="carousel-control-prev"
  //       type="button"
  //       data-bs-target="#carouselExample"
  //       data-bs-slide="prev"
  //     >
  //       <span
  //         className="carousel-control-prev-icon genCaurouselIcon"
  //         aria-hidden="true"
  //       ></span>
  //       <span className="visually-hidden">Previous</span>
  //     </button>
  //     <button
  //       className="carousel-control-next"
  //       type="button"
  //       data-bs-target="#carouselExample"
  //       data-bs-slide="next"
  //     >
  //       <span
  //         className="carousel-control-next-icon genCaurouselIcon"
  //         aria-hidden="true"
  //       ></span>
  //       <span className="visually-hidden">Next</span>
  //     </button>
  //   </div>
  // );

  let numCards = 1;

  if (fullScreen) {
    numCards = 5;
  } else if (midScreen) {
    numCards = 3;
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: numCards,
    slidesToScroll: 1,
  };

  return (
    <div class="w-85 mx-auto my-3">
      <Slider {...settings}>{currGenHTML}</Slider>
    </div>
  );
};

export default GenDisplay;
