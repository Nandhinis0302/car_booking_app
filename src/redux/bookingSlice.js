import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Fetch Bookings from Firestore
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const bookingsCollection = await getDocs(collection(db, "bookings"));
      return bookingsCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Add Booking to Firestore
export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      return { id: docRef.id, ...bookingData };
    } catch (error) {
      console.error("Failed to add booking:", error);
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Booking
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
