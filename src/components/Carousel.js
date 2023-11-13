import React from 'react';

function CarouselWithSearch() {
  const handleSearch = () => {
    // Implement your search functionality here
    alert('Searching...');
  };

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://source.unsplash.com/random/900x700/?pasta" className="d-block w-100" alt="Slide 1" />
          <div className="carousel-caption">
            {/* <h3>Slide 1</h3> */}
            {/* <p>Slide 1 caption text goes here.</p> */}
            {/* Search bar and button */}
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center' }}>
              <input className="form-control me-2" type="search" placeholder="" aria-aria-label='search' />
              <button onClick={handleSearch} className="btn btn-success ml-2">Search</button>
            </div>
          </div>
        </div>
        {/* Add more carousel items as needed */}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default CarouselWithSearch;
