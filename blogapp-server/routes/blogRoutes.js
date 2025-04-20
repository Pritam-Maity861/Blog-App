const express = require("express");
const router = express.Router();
const upload =require("../middleware/multer")
console.log(upload)
const {
  addPost,
  getPost,
  getPostByID,
  updatePostByID,
  deletePostByID,
  comments,
  findBlogsByCategory,
  deleteComment,
  toggleLike
} = require("../controllers/blogController");





router.post("/new-post", upload.single("image"), addPost);
router.get('/all-post', getPost);
router.get('/:id', getPostByID);
router.put('/update/:id',upload.single("image"), updatePostByID);
router.delete('/delete/:id', deletePostByID);
router.post('/:id/comment', comments);
router.get("/category/:category", findBlogsByCategory);
router.delete("/comment/:id/:commentId", deleteComment);
router.post("/:id/like", toggleLike);


module.exports = router;
