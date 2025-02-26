import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const carsCollection = await getDocs(collection(db, "cars"));
  return carsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addCar = createAsyncThunk("cars/addCar", async (car) => {
  const docRef = await addDoc(collection(db, "cars"), {
    ...car,
    price: Number(car.price),
    year: Number(car.year),
    engineSize: Number(car.engineSize),
    mileage: Number(car.mileage),
    seats: Number(car.seats),
    cylinders: Number(car.cylinders),
    doors: Number(car.doors),
    cityMPG: Number(car.cityMPG),
    highwayMPG: Number(car.highwayMPG),
    features: car.features || [],
    imageUrl: car.imageUrl || "",  
  });
  return { id: docRef.id, ...car };
});

export const updateCar = createAsyncThunk("cars/updateCar", async (car) => {
  const carRef = doc(db, "cars", car.id);
  await updateDoc(carRef, car);
  return car;
});

export const deleteCar = createAsyncThunk("cars/deleteCar", async (carId) => {
  await deleteDoc(doc(db, "cars", carId));
  return carId;
});

const carSlice = createSlice({
  name: "cars",
  initialState: { cars: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => { state.cars = action.payload; })
      .addCase(addCar.fulfilled, (state, action) => { state.cars.push(action.payload); })
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(car => car.id === action.payload.id);
        if (index !== -1) state.cars[index] = action.payload;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter(car => car.id !== action.payload);
      });
  },
});

export default carSlice.reducer;
