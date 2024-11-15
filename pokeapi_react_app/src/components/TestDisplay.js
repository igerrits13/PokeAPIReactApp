import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestDisplay = () => {
  // return (
  //   <div id="carouselExample" class="carousel slide w-50 mx-auto">
  //     <Slider>
  //       <div class="carousel-inner d-flex">
  //         <div class="carousel-item d-block me-0 active">
  //           <div class="card m-2">
  //             <img
  //               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
  //               class="d-block w-100"
  //               alt="..."
  //             />
  //             <div class="card-body">
  //               <h5 class="card-title">Card title</h5>
  //               <p class="card-text">
  //                 Some quick example text to build on the card title and make up
  //                 the bulk of the card's content.
  //               </p>
  //               <Link to="./" class="btn btn-primary">
  //                 Go somewhere
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //         <div class="carousel-item d-block me-0">
  //           <div class="card m-2">
  //             <img
  //               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png"
  //               class="d-block w-100"
  //               alt="..."
  //             />
  //             <div class="card-body">
  //               <h5 class="card-title">Card title</h5>
  //               <p class="card-text">
  //                 Some quick example text to build on the card title and make up
  //                 the bulk of the card's content.
  //               </p>
  //               <Link to="./" class="btn btn-primary">
  //                 Go somewhere
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //         <div class="carousel-item d-block me-0">
  //           <div class="card m-2">
  //             <img
  //               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png"
  //               class="d-block w-100"
  //               alt="..."
  //             />
  //             <div class="card-body">
  //               <h5 class="card-title">Card title</h5>
  //               <p class="card-text">
  //                 Some quick example text to build on the card title and make up
  //                 the bulk of the card's content.
  //               </p>
  //               <Link to="./" class="btn btn-primary">
  //                 Go somewhere
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //         <div class="carousel-item d-block me-0 active">
  //           <div class="card m-2">
  //             <img
  //               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png"
  //               class="d-block w-100"
  //               alt="..."
  //             />
  //             <div class="card-body">
  //               <h5 class="card-title">Card title</h5>
  //               <p class="card-text">
  //                 Some quick example text to build on the card title and make up
  //                 the bulk of the card's content.
  //               </p>
  //               <Link to="./" class="btn btn-primary">
  //                 Go somewhere
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //         <div class="carousel-item d-block me-0">
  //           <div class="card m-2">
  //             <img
  //               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png"
  //               class="d-block w-100"
  //               alt="..."
  //             />
  //             <div class="card-body">
  //               <h5 class="card-title">Card title</h5>
  //               <p class="card-text">
  //                 Some quick example text to build on the card title and make up
  //                 the bulk of the card's content.
  //               </p>
  //               <Link to="./" class="btn btn-primary">
  //                 Go somewhere
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //         <div class="carousel-item d-block me-0">
  //           <div class="card m-2">
  //             <img
  //               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png"
  //               class="d-block w-100"
  //               alt="..."
  //             />
  //             <div class="card-body">
  //               <h5 class="card-title">Card title</h5>
  //               <p class="card-text">
  //                 Some quick example text to build on the card title and make up
  //                 the bulk of the card's content.
  //               </p>
  //               <Link to="./" class="btn btn-primary">
  //                 Go somewhere
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <button
  //         class="carousel-control-prev"
  //         type="button"
  //         data-bs-target="#carouselExample"
  //         data-bs-slide="prev"
  //       >
  //         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  //         <span class="visually-hidden">Previous</span>
  //       </button>
  //       <button
  //         class="carousel-control-next"
  //         type="button"
  //         data-bs-target="#carouselExample"
  //         data-bs-slide="next"
  //       >
  //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
  //         <span class="visually-hidden">Next</span>
  //       </button>
  //     </Slider>
  //   </div>
  // );

  let num = 5;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: num,
    slidesToScroll: 1,
  };

  return (
    <div class="w-75 mx-auto">
      <Slider {...settings}>
        <div class="card">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to="./" class="btn btn-primary">
              Go somewhere
            </Link>
          </div>
        </div>

        <div class="card">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to="./" class="btn btn-primary">
              Go somewhere
            </Link>
          </div>
        </div>

        <div class="card">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to="./" class="btn btn-primary">
              Go somewhere
            </Link>
          </div>
        </div>

        <div class="card">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to="./" class="btn btn-primary">
              Go somewhere
            </Link>
          </div>
        </div>

        <div class="card">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to="./" class="btn btn-primary">
              Go somewhere
            </Link>
          </div>
        </div>

        <div class="card">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to="./" class="btn btn-primary">
              Go somewhere
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default TestDisplay;
