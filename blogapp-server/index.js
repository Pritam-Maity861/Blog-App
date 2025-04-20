const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const dotenv=require("dotenv");


dotenv.config();
const connectToDB = require("./config/db");

const postRoute = require("./routes/blogRoutes");
const userRoute = require("./routes/userRoutes");
const cors = require('cors');


//data base connection
connectToDB();

//middle-ware


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());


const port =process.env.PORT||3000;
// console.log(port);


//routes here
app.use('/post', postRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
