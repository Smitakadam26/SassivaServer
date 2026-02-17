
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

require("./config/db");

const allowedOrigins = [
  "http://localhost:3000",
  "https://sassiva.vercel.app"
];
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(require("cookie-parser")());


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
app.use("/", authRoutes);
app.use("/product", productRoutes);
app.use("/users", userRoutes);
app.use("/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
