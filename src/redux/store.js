import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./carSlice";
import userReducer from "./userSlice";
import bookingReducer from "./bookingSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    cars: carReducer,
    users: userReducer,
    bookings: bookingReducer,
    admin: adminReducer,
  },
});

export default store;

