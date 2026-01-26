
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { addProduct, updateProduct } = require("../controllers/productController");
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/admin");
const verifyToken = require("../middlewares/verifyToken");
const { getFilterProducts,getProducts } = require("../controllers/productController");

router.post(
  "/add",
  verifyToken,
  adminOnly,
  upload.array("images", 5),
  addProduct
);

router.get("/", getFilterProducts);
router.get("/All",getProducts)


router.put(
  "/:id",
  auth,
  adminOnly,
  upload.array("images", 5),
  updateProduct
);

module.exports = router;
