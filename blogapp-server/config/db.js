const mongooose = require("mongoose");
require("dotenv").config();

const connectToDB = async() => {
    try{
        await mongooose.connect(process.env.MONGO_URI);
        console.log('MongoDB connection succesfull');
        
    } catch(error) {
        console.log("connection failed", error);
        process.exit(1);
    }
}

module.exports = connectToDB;