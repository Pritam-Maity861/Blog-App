const User=require("../models/userModel");

 const getUser=async (req,res) => {
    try {
      const data=await User.find();
      if(!data||data.length===0){
          res.status(404).json({success:false,message:"No user data aviable..."});
      }
      res.send(data);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({success:false,message:"Internal server error....."});
      
    }
  }

 const deleteUser=async (req,res) => {
    try {
      const userId=req.params.id;
      const data=await User.findByIdAndDelete(userId);
      if(!data){
          res.status(404).json({success:false,message:"data not exist..."});
      }
      res.status(201).json({message:"User deleted successfully...."})
  
    } catch (error) {
      console.log(error);
      res.status(500).json({success:false,message:"Internal server error....."});
      
    }
  }

  const getSingleUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).select("-password"); 
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

  module.exports = {
    getUser,
    deleteUser,
    getSingleUser
  };