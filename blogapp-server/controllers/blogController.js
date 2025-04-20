const Blog = require("../models/blogModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});


const addPost = async (req, res) => {
    try {
      const { title, content, author,category } = req.body;
      const imageFile = req.file;
      // console.log(imageFile);
      
      // console.log("Cloudinary config:", cloudinary.config());
  
      if (!imageFile) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }
  
      // Upload to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
        folder: "blog-posts"});
        // console.log(uploadedImage)
  
      const newPost = new Blog({
        title,
        content,
        author,
        category,
        image: { url: uploadedImage.secure_url },
      });
  
      const savedPost = await newPost.save();
  
      // Delete temp file
      fs.unlink(imageFile.path, (err) => {
        if (err) console.error("Error deleting temp image:", err);
      });
  
      res.status(201).json({
        success: true,
        message: "New post created successfully",
        data: savedPost,
      });
    } catch (error) {
      console.error("Error in addPost:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Try again.",
      });
    }
  };


const getPost = async (req, res) => {
  try {
    const posts = await Blog.find({}).populate("author");
    // console.log(posts)

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched all posts successfully",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Try again.",
    });
  }
};

const getPostByID = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate("author", "name email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched post by ID successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Try again.",
    });
  }
};


const updatePostByID = async (req, res) => {
    try {
      const { title, content, author, category } = req.body;
      const imageFile = req.file; 
  
      let imageUrl;
      if (imageFile) {
        const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
          folder: "blog-posts"
        });
        imageUrl = uploadedImage.secure_url;
  
        fs.unlink(imageFile.path, (err) => {
          if (err) console.error("Error deleting temp image:", err);
        });
      }
  
      const updatedData = {
        title,
        content,
        category,
        author,
      };
  
      if (imageUrl) {
        updatedData.image = { url: imageUrl };
      }
  
      const updatedPost = await Blog.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Try again.",
      });
    }
  };
  
  

const deletePostByID = async (req, res) => {
  try {
    const deletedPost = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Try again.",
    });
  }
};

const comments = async (req, res) => {
  try {
    const { content, userId } = req.body;
    // console.log(req.body);

    if (!content || !userId) {
      return res.status(400).json({ message: "Missing content or userId" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({ content, author: userId });
    await blog.save();

    const populatedBlog = await blog.populate("comments.author", "name");

    res.status(200).json({ message: "Comment added", blog: populatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const findBlogsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
  
      if (!category || typeof category !== 'string') {
        return res.status(400).json({ message: "Invalid category provided." });
      }

      if (category === "All") {
        const blogs = await Blog.find().populate('author', 'name email'); 
        
        if (blogs.length === 0) {
          return res.status(404).json({ message: "No blogs available." });
        }
        
        return res.status(200).json({ message: "Blogs found", data: blogs });
      }
  
      const blogs = await Blog.find({ category }).populate('author', 'name email');
  
      if (blogs.length === 0) {
        return res.status(404).json({ message: `No blogs found for the "${category}" category.` });
      }
  
      
      return res.status(200).json({ message: `Blogs found for "${category}" category`, data: blogs });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error, please try again later." });
    }
};


const deleteComment = async (req, res) => {
  try {
    const { id: blogId, commentId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    // Only the comment's author or blog's author can delete
    if (comment.author.toString() !== userId && blog.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Remove the comment
    comment.deleteOne(); 

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      comments: blog.comments, 
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Try again." });
  }
};



const toggleLike = async (req, res) => {
  try {
    const { userId } = req.body; // user who is liking/unliking the post
    const { id } = req.params; // post ID

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Check if the user has already liked the post
    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
      blog.likes = blog.likes.filter(like => like.toString() !== userId);
    } else {
      // Add user to likes array
      blog.likes.push(userId);
    }

    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: hasLiked ? "Post unliked successfully" : "Post liked successfully",
      likes: updatedBlog.likes,
    });
  } catch (error) {
    console.error("Error in toggleLike:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Try again." });
  }
};

  

module.exports = {
  addPost,
  getPost,
  getPostByID,
  updatePostByID,
  deletePostByID,
  comments,
  findBlogsByCategory,
  deleteComment,
  toggleLike
};
