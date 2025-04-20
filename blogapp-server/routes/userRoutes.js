const express = require("express");
const router = express.Router();
const { registerUser, loginUser, myBlogs } = require("../controllers/userController");
const { getUser, deleteUser, getSingleUser } = require("../controllers/userCURDop");
const { verifyToken } = require("../middleware/verifyToken");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser", getUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/myblogs",verifyToken, myBlogs);
router.get("/singleuser/:id",getSingleUser);

// router.post("/profile", userProfile);


module.exports = router;
