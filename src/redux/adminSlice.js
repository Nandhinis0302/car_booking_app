import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firestore instance
const db = getFirestore();

// Async thunk to fetch admin stats
export const fetchAdminStats = createAsyncThunk("admin/fetchStats", async () => {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const carsSnapshot = await getDocs(collection(db, "cars"));
  const bookingsSnapshot = await getDocs(collection(db, "bookings"));

  // Process monthly bookings
  const monthlyData = new Array(12).fill(0);
  bookingsSnapshot.forEach((doc) => {
    const bookingDate = doc.data().date;
    if (bookingDate) {
      const month = new Date(bookingDate).getMonth();
      monthlyData[month]++;
    }
  });

  // Format data for chart
  const formattedData = monthlyData.map((count, index) => ({
    month: new Date(2023, index, 1).toLocaleString("default", { month: "short" }),
    count,
  }));

  return {
    usersCount: usersSnapshot.size,
    carsCount: carsSnapshot.size,
    bookingsCount: bookingsSnapshot.size,
    monthlyBookings: formattedData,
  };
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    usersCount: 0,
    carsCount: 0,
    bookingsCount: 0,
    monthlyBookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.usersCount = action.payload.usersCount;
        state.carsCount = action.payload.carsCount;
        state.bookingsCount = action.payload.bookingsCount;
        state.monthlyBookings = action.payload.monthlyBookings;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
