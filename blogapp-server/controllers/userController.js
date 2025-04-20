const User = require("../models/userModel");
const Blog=require("../models/blogModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use consistent variable name
const secretKey = process.env.JWT_SECRET;

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const normalizedEmail = email.toLowerCase();

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { name }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists. Try another.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered. Please sign up first.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or password is invalid.",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        userName: user.name,
        role: user.role,
      },
      secretKey,
      { expiresIn: "15m" }
    );
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      userId: user._id,
      user:user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};




const myBlogs=async (req, res) => {
  try {
    const userId = req.userId;
    
    console.log(userId);
    
    const myBlogs = await Blog.find({ author: userId });
    console.log(myBlogs)
    res.status(200).json(myBlogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  myBlogs
};
