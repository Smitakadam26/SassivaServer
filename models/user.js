const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    location: {
      type: String,
    },
    avatar: {
      type: String // image URL
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
