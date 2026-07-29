
const express = require("express");
const {
  getProfile,
  updateProfile,
  getUsers
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require('../middlewares/upload')
const router = express.Router();
const {protect} = require('../middlewares/auth')

router.get("/profile", protect, getProfile);
router.get("/All",protect,getUsers)
router.put(
  "/profile",
  verifyToken,
  upload.single("avatar"),
  updateProfile
);

module.exports = router;
