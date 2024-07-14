const express = require("express");

const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} = require("../controller/ProductController");

const { isAuth } = require("../services/common");
const router = express.Router();

router.post("/", isAuth(), createProduct);
router.get("/", fetchAllProducts);
router.get("/:id", isAuth(), fetchProductById);
router.patch("/:id", isAuth(), updateProduct);

module.exports = router;
