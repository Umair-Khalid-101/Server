const express = require("express");
const {
  addPost,
  getPosts,
  getUserPosts,
  deletePost,
  updatePost,
  postById,
  pendingPosts,
} = require("../controllers/postsController");
const authmiddleware = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/src/app/Uploads/Campaigns");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/newpost", upload.single("picture"), addPost);
router.get("/allposts", getPosts);
router.get("/userposts", authmiddleware, getUserPosts);
router.delete("/deletepost/:id", deletePost);
router.patch("/editpost/:id", updatePost);
router.get("/post/:id", postById);
router.get("/pendingposts", pendingPosts);

module.exports = router;
