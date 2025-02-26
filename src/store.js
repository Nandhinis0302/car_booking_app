import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./redux/carSlice"; // Import car slice

export const store = configureStore({
  reducer: {
    cars: carReducer, // Register the car slice
  },
});
