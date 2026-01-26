
const express = require("express");
const {
  getProfile,
  updateProfile
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require('../middlewares/upload')
const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.put(
  "/profile",
  verifyToken,
  upload.single("avatar"),
  updateProfile
);

module.exports = router;
