import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders,
  updateUser,
  
} from "./userAPI";

const initialState = {
  userInfo: null,
  status: "idle",
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    console.log(update);
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from logged-in User info
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
       ;
  },
});

export const selectUserOrders = (state) => state.user.userInfo.orders;

export const { increment } = userSlice.actions;

export default userSlice.reducer;
