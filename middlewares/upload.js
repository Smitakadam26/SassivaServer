
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "others";

    if (file.fieldname === "avatar") {
      folder = "users";
    }

    if (file.fieldname === "images") {
      folder = "products";
    }

    return {
      folder,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
