import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import ProductList from "./pages/Product/productList";
import ProductDetail from "./pages/Product/ProductDetail";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Protected from "./components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetLoginUserAsync, selectloginUser } from "./pages/auth/authSlice";
import Order from "./pages/Order/order";
import Myprofile from "./pages/User/userProfile";
import Myorders from "./pages/User/userOrder";
import ForgetPassword from "./pages/auth/ForgetPassword";
import EmailVerification from "./pages/auth/EmailVerification";
import DownloadApp from "./components/downloadApp";
import useAutoLogin from "./hooks/useAutoLogin";
import ToastLayout from "./components/ToastLayout"; // Adjust the import path based on your structure
import { fetchItemsByUserIdAsync } from "./pages/Cart/CartSlice";
import AdminChat from "./components/chat/adminChat";
import UserChat from "./components/chat/userChat";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectloginUser);
  console.log(user);
  const loading = useAutoLogin();

  useEffect(() => {
    if (!loading && user) {
      dispatch(GetLoginUserAsync());
      dispatch(fetchItemsByUserIdAsync());
    }
  }, [dispatch, user, loading]);

  return loading ? null : (
    <BrowserRouter>
      <ToastLayout>
        <div className="bg-mute">
          <Layout />
        </div>
      </ToastLayout>
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();
  const user = useSelector(selectloginUser);
  const showNavbar = ![
    "/login",
    "/forgot-password",
    "/verify-email",
    "/download-app",
  ].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {user && user.role === "admin" && <AdminChat />}
      {user && user.role === "user" && <UserChat />}

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
        <Route path="download-app" exact element={<DownloadApp />} />
        <Route path="login" exact element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
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
    </>
  );
}

export default App;

// npx json-server --watch -p 8080 db.json
// npm install --save react-alert react-alert-template-basic --force
// https://mhnpd.github.io/react-loader-spinner/docs/intro/
// stripe is ban in pakistan. i skip this lecture. in future, if you need then watch coder dost tutorial.

// shadcn add method
// npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react
// npm install react-app-rewired customize-cra --save-dev
// npm install react-app-rewire-alias --save-dev
// add all the configurations files
