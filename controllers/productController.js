
const Product = require("../models/Product");

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

exports.getFilterProducts = async (req, res) => {
  try {
     const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let updateData = req.body;
console.log(req.body);
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
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};