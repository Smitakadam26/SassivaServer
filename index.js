require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/product",productRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
