// import React from "react";
// import "./CarCard.css";

// const CarCard = ({ car }) => {
//   return (
//     <div className="car-card">
//       <img src={car.image} alt={car.name} className="car-image" />
//       <div className="car-info">
//         <h3>{car.name}</h3>
//         <p><strong>Brand:</strong> {car.brand}</p>
//         <p><strong>Price:</strong> ₹{car.price}</p>
//         <p><strong>Fuel:</strong> {car.fuelType}</p>
//         <p><strong>Mileage:</strong> {car.mileage} km</p>
//         <button className="view-details">View Details</button>
//       </div>
//     </div>
//   );
// };

// export default CarCard;







// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./CarCard.css";

// const CarCard = ({ car }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="car-card">
//       <img src={car.imageUrl} alt={car.name} className="car-image" />
//       <div className="car-info">
//         <h3>{car.name}</h3>
//         <p><strong>Brand:</strong> {car.brand}</p>
//         <p><strong>Price:</strong> ₹{car.price}</p>
//         <p><strong>Fuel:</strong> {car.fuelType}</p>
//         <p><strong>Mileage:</strong> {car.mileage} km</p>
//         <button onClick={() => navigate(`/cars/${car.id}`)} className="view-details">
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarCard;
