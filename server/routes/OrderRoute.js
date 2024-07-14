const express = require("express");
const passport = require("passport");

const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/OrderController");
const { isAuth } = require("../services/common");
const router = express.Router();

router.post("/", isAuth(), createOrder);
router.get("/own", isAuth(), fetchOrdersByUser);
router.get("/", isAuth(), fetchAllOrders);
router.delete("/:id", isAuth(), deleteOrder);
router.patch("/:id", isAuth(), updateOrder);

module.exports = router;
