
const express = require("express");
const passport = require("passport");

const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} = require("../controller/ProductController");

const { fetchBrands, createBrand } = require("../controller/BrandController");

const {
  fetchCategories,
  createCategory,
} = require("../controller/CategoryController");

const {
  createUser,
  loginUser,
  checkAuth,
  resetPassword,
  resetPasswordRequest,
  logout,
} = require("../controller/AuthController");

const {
  addToCart,
  fetchCartByUser, 
  deleteFromCart,
  updateCart,
} = require("../controller/CartController");

const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/OrderController");

const { fetchUserById, updateUser } = require("../controller/UserController");

const { isAuth } = require("../services/common");

const router = express.Router();

// Product

router
  .post("/products", isAuth(), createProduct)
  .get("/products", fetchAllProducts)
  .get("/products/:id", isAuth(), fetchProductById)
  .patch("/products/:id", isAuth(), updateProduct);

// Brand
router.get("/brands", fetchBrands).post("/brands", createBrand);

// Category
router.get("/categories", fetchCategories).post("/categories", createCategory);

// Auth
router
  .post("/auth/signup", createUser)
  .post("/auth/login", passport.authenticate("local"), loginUser)
  .get("/auth/logout", logout)
  .get("/auth/check", isAuth(), checkAuth)
  .post("/auth/reset-password-request", resetPasswordRequest)
  .post("/auth/reset-password", resetPassword);

// User
router
  .get("/users/own", isAuth(), fetchUserById)
  .patch("/users/:id", isAuth(), updateUser);

// Cart
router
  .post("/cart/", isAuth(), addToCart)
  .get("/cart/", isAuth(), fetchCartByUser)
  .delete("/cart/:id", isAuth(), deleteFromCart)
  .patch("/cart/:id", isAuth(), updateCart);

// Order
router
  .post("/orders/", isAuth(), createOrder)
  .get("/orders/own", isAuth(), fetchOrdersByUser)
  .delete("/orders/:id", isAuth(), deleteOrder)
  .patch("/orders/:id", isAuth(), updateOrder)
  .get("/orders", isAuth(), fetchAllOrders);

module.exports = router;
