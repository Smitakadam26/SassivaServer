
const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getUsers = async (req, res) => {
  try {
    console.log("User model:", User);

    const allUsers = await User.find();
    console.log("All users:", allUsers);

    const users = await User.find({ role: "user" });
    console.log("Filtered users:", users);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
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

