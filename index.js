
require("dotenv").config();
const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");

require("./config/db");

const allowedOrigins = [
  "http://localhost:3000",
  "https://fashion-eccomerce-web-client.vercel.app"
];

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


app.use(express.json());
app.use(cookieparser());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/", authRoutes);
app.use("/product", productRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
