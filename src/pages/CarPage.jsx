import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/carSlice";
import { Link } from "react-router-dom";
import "./CarPage.css";

const CarPage = () => {
  const dispatch = useDispatch();
  const { cars, status, error } = useSelector((state) => state.cars);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCars());
    }
  }, [dispatch, status]);

  return (
    <div className="car-page">
      {/* Vertical Moving Car Show */}
      <section className="car-show">
        <div className="car-scroll">
          {cars.map((car) => (
            <div key={car.id} className="car-show-item">
              <img src={car.imageUrl} alt={car.name} className="car-show-image" />
            </div>
          ))}
        </div>
      </section>

      {/* Car Listings Section */}
      <section className="car-list">
        <h2>All Cars</h2>
        {status === "loading" && <p>Loading cars...</p>}
        {error && <p>Error: {error}</p>}
        <div className="car-grid">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.imageUrl} alt={car.name} className="car-image" />
              <h3 className="car-title">{car.name}</h3>
              <p className="car-price">Price: ${car.price}</p>
              <Link to={`/car/${car.id}`} className="car-link">View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CarPage;
