import React from 'react';

function Carousel() {
  return (
    <div className="container mb-3">
      <div id="carouselExampleIndicators" className="carousel slide mt-3" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/watch-1.jpg" className="d-block w-100" alt="" />
          </div>
          <div className="carousel-item">
            <img src="images/watch-2.jpg" className="d-block w-100" alt="" />
          </div>
          <div className="carousel-item">
            <img src="images/watch-3.jpg" className="d-block w-100" alt="" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div >
  );
}

export default Carousel;
