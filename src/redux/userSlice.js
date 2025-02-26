import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const usersCollection = await getDocs(collection(db, "users"));
  return usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = "succeeded";
    });
  },
});

export default userSlice.reducer;
