// controllers/productController.js
const Product = require("../models/Product");

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {

    if (!req.files || !req.files.length) {
      return res.status(400).json({ message: "Images are required" });
    }

    const images = req.files.map((file) => file.path);

    const product = await Product.create({
      name: req.body.name,
      brand: req.body.brand,
      fabric: req.body.fabric,
      color: req.body.color,
      size: req.body.size,

      quantity: Number(req.body.quantity), // ✅ convert
      packof: Number(req.body.packof),
      price: Number(req.body.price),

      category: req.body.category,
      type: req.body.type,

      images,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
     const filter = {};

    // 👇 THIS IS THE IMPORTANT PART
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    let updateData = req.body;

    if (req.files?.length) {
      updateData.images = req.files.map(file => file.path);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
