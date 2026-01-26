
const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber, gender, location } = req.body;

    const updatedData = {
      name,
      phoneNumber,
      gender,
      location,
    };

    if (req.file) {
      updatedData.avatar = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true }
    );

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

