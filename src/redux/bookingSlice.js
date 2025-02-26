import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Fetch bookings from Firestore
export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async () => {
  const bookingsCollection = await getDocs(collection(db, "bookings"));
  return bookingsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Add new booking to Firestore
export const addBooking = createAsyncThunk("bookings/addBooking", async (bookingData) => {
  const docRef = await addDoc(collection(db, "bookings"), bookingData);
  return { id: docRef.id, ...bookingData };
});

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.status = "succeeded";
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      });
  },
});

export default bookingSlice.reducer;
