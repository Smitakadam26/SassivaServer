
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { addProduct, updateProduct, getProductById,getFilterProducts,getProducts } = require("../controllers/productController");
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/admin");
const verifyToken = require("../middlewares/verifyToken");

router.post(
  "/add",
  verifyToken,
  adminOnly,
  upload.array("images", 5),
  addProduct
);

router.get("/", getFilterProducts);
router.get("/All",getProducts)
router.get(
  "/:id",
  getProductById
);

router.put(
  "/:id",
  auth,
  adminOnly,
  upload.array("images", 5),
  updateProduct
);

module.exports = router;
