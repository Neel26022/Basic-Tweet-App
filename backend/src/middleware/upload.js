import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname || ""));
  },
});

const fileFilter = (req, file, cb) => {
  if (!file || !file.originalname) {
    return cb(new Error("No file provided"), false);
  }

  const ext = path.extname(file.originalname).toLowerCase();
  if ([".png", ".jpg", ".jpeg"].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
