const mongoose = require("mongoose");




const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    trim: true,
    maxLenght: [50, "can not exceed 50 charecters"],
  },
  content: {
    type: String,
    // required: true,
  },
  image: {
    url: {
      type: String,
      required: false,
    },
  },
  category: {
    type: String,  
    enum: ['Technology', 'Lifestyle', 'Education', 'Health', 'Travel','Business','other'],  
    default: 'other', 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Blog", blogSchema);
