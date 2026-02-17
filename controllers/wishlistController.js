const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate("products");

    if (!wishlist) {
      return res.json({ products: [] });
    }
    res.json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $addToSet: { products: productId } }, 
      { new: true, upsert: true }
    );
    console.log(wishlist);
    res.json({ message: "Added to wishlist" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: productId } }
    );

    res.json({ message: "Removed from wishlist" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
