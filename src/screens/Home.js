import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";

export default function Home() {
  const [FoodCat, setFoodCat] = useState([]);
  const [FoodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700/?pasta"
              className="d-block w-100"
              alt="Slide 1"
            />
            <div className="carousel-caption">
              <div
                className="search-bar justify-content-center"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder=""
                  aria-label="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {FoodCat.length > 0
          ? FoodCat.map((data) => (
              <div key={data.id} className="row mb-3">
                <div className="col-12">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  <div className="row">
                    {FoodItem.length > 0
                      ? FoodItem.filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name.toLowerCase().includes(search.toLowerCase())
                        ).map((filterItems) => (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Cards
                              foodItems={filterItems}
                              options={filterItems.options[0]}
                            />
                          </div>
                        ))
                      : "No Items Found"}
                  </div>
                </div>
              </div>
            ))
          : "No food categories available"}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
