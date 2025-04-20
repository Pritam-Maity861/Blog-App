const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    trim: true,
    maxLenght: [20, "can not exceed 20 charecters"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    
  },
  role : {
    type : String,
    enum : ['user', 'admin'],
    default : 'user'
  },
  bio: String,
  followers: Number,
  followings: Number,
});

module.exports = mongoose.model("User", userSchema);
