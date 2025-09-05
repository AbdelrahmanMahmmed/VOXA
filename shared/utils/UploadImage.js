const multer = require("multer");
const cloudinary = require("../../infrastructure/coludinary");
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "images",
      },
      (error, result) => {
        if (error) {
          reject("Error uploading video to Cloudinary:", error);
        }
        resolve(result);
      },
    );
    stream.end(file.buffer);
  });
};

module.exports = { upload, uploadImage };
