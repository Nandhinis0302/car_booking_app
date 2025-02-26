import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/carSlice";
import { addBooking } from "../redux/bookingSlice";
import { auth } from "../firebaseConfig"; // Firebase Auth
import "./Cars.css";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cars, status } = useSelector((state) => state.cars);
  const user = auth.currentUser; // Get logged-in user
  const [bookingData, setBookingData] = useState({
    name: "",
    email: user?.email || "", // Autofill logged-in user's email
    phone: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCars());
    }
  }, [dispatch, status]);

  const car = cars.find((c) => c.id === id);
  if (!car) return <h2>Loading...</h2>;

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const bookingDetails = {
      ...bookingData,
      carId: id,
      carName: car.name,
      imageUrl: car.imageUrl,
    };

    dispatch(addBooking(bookingDetails)); // Dispatch to Redux & Firestore
    alert("Booking successful! ✅");
    setBookingData({ name: "", email: user?.email || "", phone: "" }); // Reset form
  };

  return (
    <div className="car-details">
      <div className="car-images">
        <img src={car.imageUrl} alt={car.name} className="main-image" />
        <div className="thumbnail-list">
          {car.images?.slice(0, 4).map((img, index) => (
            <img key={index} src={img} alt={`${car.name} Angle ${index + 1}`} className="thumbnail" />
          ))}
        </div>
      </div>

      <div className="car-header">
        <h1>{car.name}</h1>
        <div className="car-actions">
          <button className="share">🔗 Share</button>
          <button className="favorite">❤️ Favorite</button>
        </div>
      </div>

      <div className="des">
        <h2>Description</h2>
        <p>{car.description}</p>
      </div>

      <div className="car-info-grid">
        <div className="specs">
          <h2>Car Specifications</h2>
          <table>
            <tbody>
              <tr><td>Year:</td><td>{car.year}</td></tr>
              <tr><td>Engine:</td><td>{car.engineSize} cc</td></tr>
              <tr><td>Mileage:</td><td>{car.mileage} km</td></tr>
              <tr><td>Fuel Type:</td><td>{car.fuelType}</td></tr>
              <tr><td>Seats:</td><td>{car.seats}</td></tr>
              <tr><td>Driver Type:</td><td>{car.driverType}</td></tr>
              <tr><td>Cylinders:</td><td>{car.cylinders}</td></tr>
              <tr><td>Color:</td><td>{car.color}</td></tr>
              <tr><td>Doors:</td><td>{car.doors}</td></tr>
              <tr><td>CityMPG:</td><td>{car.cityMPG}</td></tr>
              <tr><td>HighwayMPG:</td><td>{car.highwayMPG}</td></tr>
            </tbody>
          </table>
          <div className="features">
          <h2>Features</h2>
          <ul>
            {car.features?.map((feature, index) => (
              <li key={index}>✔ {feature}</li>
            ))}
          </ul>
        </div>
        </div>

        <div className="booking-section">
          <img src={car.imageUrl} alt={car.name} className="main-image" />
          <h2>Book This Car</h2>
          <form onSubmit={handleBooking}>
            <input type="text" name="name" placeholder="Your Name" value={bookingData.name} onChange={handleInputChange} required />
            <input type="email" name="email" value={bookingData.email} readOnly required />
            <input type="tel" name="phone" placeholder="Phone Number" value={bookingData.phone} onChange={handleInputChange} required />
            <button type="submit" className="book-btn">Book My Car</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
