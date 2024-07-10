const express = require("express");
const passport = require("passport");

const {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCart,
} = require("../controller/CartController");

const { isAuth } = require("../services/common");
const router = express.Router();

router.post("/", isAuth(), addToCart);
router.get("/", isAuth(), fetchCartByUser);
router.delete("/:id", isAuth(), deleteFromCart);
router.patch("/:id", isAuth(), updateCart);

module.exports = router;
