// controllers/userController.js
const User = require("../models/user");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/userController.js
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        phone,
        avatar,
        gender
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
