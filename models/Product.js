const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    fabric: String,
    color: String,

    size: String, 

    quantity: { type: Number, required: true }, 
    packof: { type: Number, default: 1 },

    price: { type: Number, required: true },

    category: {
      type: String,
      enum: ["women", "men", "kids"],
      required: true,
    },

    type: {
      type: String,
      enum: ["clothing", "footwear", "beauty", "jwellery","bag","accessories","watches","toys","babycare"],
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
