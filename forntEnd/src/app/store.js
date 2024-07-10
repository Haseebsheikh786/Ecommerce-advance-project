import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../pages/Product/ProductSlice";
import authReducer from "../pages/auth/authSlice";
import userReducer from "../pages/User/userSlice";
import CartSlice from "../pages/Cart/CartSlice";
import orderSlice from "../pages/Order/orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    cart: CartSlice,
    order: orderSlice,
  },
});
