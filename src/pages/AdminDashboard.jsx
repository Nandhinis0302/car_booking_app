     
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, addCar, updateCar, deleteCar } from "../redux/carSlice";
import { fetchUsers } from "../redux/userSlice";
import { fetchBookings } from "../redux/bookingSlice";
import { fetchAdminStats } from "../redux/adminSlice";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Admin.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { usersCount, carsCount, bookingsCount, monthlyBookings, loading, error } = useSelector((state) => state.admin);
  const cars = useSelector((state) => state.cars.cars);
  const users = useSelector((state) => state.users.users);
  const bookings = useSelector((state) => state.bookings.bookings);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [editCarId, setEditCarId] = useState(null);
  const [car, setCar] = useState({
    name: "",
    ownerName: "",
    price: "",
    year: "",
    engineSize: "",
    mileage: "",
    driverType: "",
    cylinders: "",
    seats: "",
    fuelType: "",
    doors: "",
    color: "",
    description: "",
    cityMPG: "",
    highwayMPG: "",
    address: "",
    imageUrl: "",
    features: [],
  });

  useEffect(() => {
    if (activeTab === "users") dispatch(fetchUsers());
    if (activeTab === "cars") dispatch(fetchCars());
    if (activeTab === "bookings") dispatch(fetchBookings());
  }, [activeTab, dispatch]);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleFeaturesChange = (e) => {
    const { value, checked } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      features: checked ? [...prevCar.features, value] : prevCar.features.filter((feature) => feature !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCarId) {
      dispatch(updateCar({ ...car, id: editCarId }));
      alert("Car updated successfully!");
    } else {
      dispatch(addCar(car));
      alert("Car added successfully!");
    }
    resetForm();
    setActiveTab("cars");
  };

  const handleEdit = (car) => {
    setCar(car);
    setEditCarId(car.id);
    setActiveTab("editCar");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      dispatch(deleteCar(id));
      alert("Car deleted successfully!");
    }
  };

  const resetForm = () => {
    setCar({
      name: "",
      ownerName: "",
      price: "",
      year: "",
      engineSize: "",
      mileage: "",
      driverType: "",
      cylinders: "",
      seats: "",
      fuelType: "",
      doors: "",
      color: "",
      description: "",
      cityMPG: "",
      highwayMPG: "",
      address: "",
      imageUrl: "",
      features: [],
    });
    setEditCarId(null);
  };
  const handleStatusChange = async (id, status) => {
    try {
      // Update Firestore Database
      const bookingRef = doc(db, "bookings", id);
      await updateDoc(bookingRef, { status: status });

      // Auto Fetch Data Again 🔥
      dispatch(fetchBookings());
      toast.success("Status Updated Successfully! ✅");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to Update Status ❌");
    }
  };
  
  

  return (
    <div className="admin-container">
      <div className="sidebar">
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("cars")}>Cars</button>
        <button onClick={() => setActiveTab("addCar")}>Add Car</button>
        <button onClick={() => setActiveTab("bookings")}>Bookings</button>
      </div>

      <div className="main-content">
        {activeTab === "dashboard" && (
          <>
            <h1>Admin Dashboard</h1>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{usersCount}</p>
              </div>
              <div className="stat-card">
                <h3>Total Bookings</h3>
                <p>{bookingsCount}</p>
              </div>
              <div className="stat-card">
                <h3>Total Cars</h3>
                <p>{carsCount}</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyBookings} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeTab === "users" && (
          <div className="table-container">
            <h2>Registered Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="2">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
       
        {/* Cars List */}
        {activeTab === "cars" &&
          cars.map((car) => (
            <div key={car.id} className="car-item">
              <h3>{car.name} - ${car.price}</h3>
              {car.imageUrl && (
                <img src={car.imageUrl} alt="Car" style={{ width: "100px", height: "auto" }} />
              )}
              <button onClick={() => handleEdit(car)}>Edit</button>
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </div>
          ))}

        {/* Bookings Table */}
        {activeTab === "bookings" && (
            <div className="table-container">
              <h2>Bookings List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Car Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.carName}</td>
                        <td>{booking.email}</td>
                        <td>{booking.phone}</td>
                        <td>{booking.status || "Pending"}</td>
                        <td>
                          <button
                            style={{ background: booking.status === "Confirmed" ? "green" : "" }}
                            onClick={() => handleStatusChange(booking.id, "Confirmed")}
                          >
                            Confirm
                          </button>
                          <button
                            style={{ background: booking.status === "Denied" ? "red" : "" }}
                            onClick={() => handleStatusChange(booking.id, "Denied")}
                          >
                            Deny
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No bookings found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        {/* Add/Edit Car Form */}
        {(activeTab === "addCar" || activeTab === "editCar") && (
          <form onSubmit={handleSubmit} className="car-form">
            {Object.keys(car).map((key) =>
              key !== "features" ? (
                <div key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input type="text" name={key} value={car[key]} onChange={handleChange} required />
                </div>
              ) : (
                <div key={key}>
                  <label>Features</label>
                  <div className="checkbox-group">
                    {["GPS", "Sunroof", "Leather Seats", "Bluetooth", "Backup Camera"].map(
                      (feature) => (
                        <label key={feature}>
                          <input
                            type="checkbox"
                            value={feature}
                            checked={car.features.includes(feature)}
                            onChange={handleFeaturesChange}
                          />
                          {feature}
                        </label>
                      )
                    )}
                  </div>
                </div>
              )
            )}

            <button type="submit">{editCarId ? "Update Car" : "Add Car"}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
