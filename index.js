const { response } = require("express");
const express = require("express");
const dotenv = require('dotenv')
const cors = require("cors");
const { default: mongoose } = require("mongoose");
// const User = require("./db/User");
// const Product = require("./db/Product")
// require("./db/config");
const authRoute = require("./Routes/auth")
const app = express();
dotenv.config()

const connect = async()=>{
  try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");

  }catch(error){
    // console.log(error);
    throw error
  }
}
mongoose.connection.on('disconnected',()=>{
  console.log("mongoDB Disconnected");
})
mongoose.connection.on('connected',()=>{
  console.log("mongoDB connected!");
})


app.use(express.json());
app.use(cors());


// app.use("/",(req,resp)=>{
//   resp.send("data")
// })

app.use("/api/auth",authRoute)

app.use((err,req,resp,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"
  return resp.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack: err.stack
  })
})


app.listen(5000, () => {
    connect()
    console.log(`app is listening at 5000 port`);
  });
  


























// app.post("/register", async (req, res) => {
//   let users = new User(req.body);
//   let result = await users.save();
//   result= result.toObject();
//   delete result.password
//   res.send(result);
// });

// app.post("/logIn", async (req, res) => {
//   let { password, email } = req.body;
//   if (password && email) {
//     let user = await User.findOne(req.body).select("-password");
//     if (user) {
//       res.send(user);
//     } else {
//       res.send({ result: "No User Found" });
//     }
//   } else {
//     res.send({ result: "No User Found" });
//   }
// });


// app.post("/add-product",async(req,resp)=>{
//   let product = new Product(req.body);
//   let result = await product.save();
//   console.log(result)
//   resp.send(result)
// })

// app.listen(5000, () => {
//   console.log(`app is listening at 5000 port`);
// });
