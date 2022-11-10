const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/src/Uploads/Users");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });
const {
  register,
  auth,
  currentUser,
} = require("../controllers/userController");
const authmiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/register", upload.single("picture"), register);
router.post("/auth", auth);
router.get("/currentuser", authmiddleware, currentUser);

module.exports = router;
