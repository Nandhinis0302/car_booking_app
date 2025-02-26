// import React, { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import "./CarCard.css"; // For styling
// import CarCard from "./CarCard"; // Reusable card component

// function CarList() {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const carsCollection = await getDocs(collection(db, "cars"));
//         setCars(carsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };
//     fetchCars();
//   }, []);

//   return (
//     <div className="car-list-container">
//       <h2>Available Cars</h2>
//       <div className="car-grid">
//         {cars.length > 0 ? (
//           cars.map(car => <CarCard key={car.id} car={car} />)
//         ) : (
//           <p>No cars available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CarList;






// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCars } from "../redux/carSlice";
// import CarCard from "./CarCard";
// import "./CarCard.css";

// const CarList = () => {
//   const dispatch = useDispatch();
//   const { cars, status, error } = useSelector((state) => state.cars);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCars()); // Fetch cars when component mounts
//     }
//   }, [dispatch, status]);

//   if (status === "loading") return <h2>Loading...</h2>;
//   if (status === "failed") return <h2>{error}</h2>;

//   return (
//     <div className="car-list-container">
//       <h2>Available Cars</h2>
//       <div className="car-grid">
//         {cars.length > 0 ? (
//           cars.map((car) => <CarCard key={car.id} car={car} />)
//         ) : (
//           <p>No cars available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CarList;
