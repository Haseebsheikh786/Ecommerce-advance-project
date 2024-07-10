import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import { ProductList } from "./pages/Product/productList";
import ProductDetail from "./pages/Product/ProductDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Protected from "./components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./pages/auth/authSlice";
import { fetchLoggedInUserAsync } from "./pages/User/userSlice";
import SignOut from "./pages/auth/signOut";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Order from "./pages/Order/order";
import Myprofile from "./pages/User/userProfile";
import Myorders from "./pages/User/userOrder";

function App() {
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_LEFT,
  };
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <>
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<ProductList />} />
              <Route
                path="product-detail/:id"
                exact
                element={
                  <Protected>
                    <ProductDetail />
                  </Protected>
                }
              />
              <Route path="login" exact element={<Login />} />
              <Route path="signup" exact element={<Signup />} />
              <Route path="signOut" exact element={<SignOut />} />
              <Route
                path="cart"
                exact
                element={
                  <Protected>
                    <Cart />
                  </Protected>
                }
              />
              <Route
                path="checkout"
                exact
                element={
                  <Protected>
                    <Checkout />
                  </Protected>
                }
              />

              <Route path="*" exact element={<Error />} />
              <Route
                path="/profile"
                exact
                element={
                  <Protected>
                    <Myprofile />
                  </Protected>
                }
              />
              <Route
                path="/orders"
                exact
                element={
                  <Protected>
                    <Myorders />
                  </Protected>
                }
              />
              <Route path="/order-success/:id" exact element={<Order />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      )}
    </>
  );
}

export default App;

// npx json-server --watch -p 8080 db.json
// npm install --save react-alert react-alert-template-basic --force
// https://mhnpd.github.io/react-loader-spinner/docs/intro/
// stripe is ban in pakistan. i skip this lecture. in future, if you need then watch coder dost tutorial.
