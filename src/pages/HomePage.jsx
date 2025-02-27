import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/carSlice";
import { Link } from "react-router-dom";
import "./Landing.css";


const HomePage = () => {
  const dispatch = useDispatch();
  const { cars, status, error } = useSelector((state) => state.cars);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCars());
    }
  }, [dispatch, status]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <p className="hero-quote">"The cars we drive say a lot about us." – Alexandra Paul</p>
        </div>
      </section>

      {/* Latest Cars Section */}
      <section className="latest-cars">
        <h2>Latest Cars</h2>
        {status === "loading" && <p>Loading cars...</p>}
        {error && <p>Error: {error}</p>}
        <div className="car-listings">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.imageUrl} alt={car.name} className="car-imagehome" />
              <h3 className="car-title">{car.name}</h3>
              <p className="car-price">Price : {car.price}</p>
              <Link to={`/car/${car.id}`} className="car-link">View Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="our-journey">
        <div className="journey-content">
          <h2>Our Journey</h2>
          <p>
          Drive Your Dreams, Buy Your Next Car with Confidence!
Explore top-quality second-hand cars at the best prices with secure bookings.
Seamless buying experience with trusted sellers and verified listings.
          </p>
          <div className="journey-stats">
            <div className="stat-box">
              <h3>200+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-box">
              <h3>10K+</h3>
              <p>Requests Per Client</p>
            </div>
            <div className="stat-box">
              <h3>16+</h3>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
        <div className="journey-image">
          <img src="https://static.photodexia.com/largeweb/repository/u-enblog/b0f1f0edaf1ff19db5b1b33142574a0aphoto14988879608472a5e46312788" alt="Journey Speedometer" />
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values">
        <h2>Our Values</h2>
        <p className="values-description">
          We are committed to providing high-quality vehicles and services. Our core values drive our customer satisfaction.
        </p>
        <div className="values-container">
          <div className="value-card">
            <span className="icon">⭐</span>
            <h3>Trust</h3>
            <p>Trust is the cornerstone of every successful resale transaction.</p>
          </div>
          <div className="value-card">
            <span className="icon">🏆</span>
            <h3>Excellence</h3>
            <p>We set a high standard for our services, ensuring the best quality and reliability.</p>
          </div>
          <div className="value-card">
            <span className="icon">🤝</span>
            <h3>Client Centric</h3>
            <p>Your desires and needs are at the center of our service.</p>
          </div>
          <div className="value-card">
            <span className="icon">🔒</span>
            <h3>Our Commitment</h3>
            <p>We are dedicated to providing you with the highest level of service and satisfaction.</p>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <footer className="footer">
        <div className="contact">
          <h2>Contact Us</h2>
          <p className="contact-text">📧 Email: support@carspot.com</p>
          <p className="contact-text">📞 Phone: +123 456 7890</p>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CarShop | All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
