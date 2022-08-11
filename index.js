const { response } = require("express");
const express = require("express");
const cors = require("cors")
const User = require("./db/User");
require("./db/config")
const user = require("./db/User")
const app = express();


app.use(express.json());
app.use(cors())
app.post("/register",async(req,res)=>{
    let users = new User(req.body);
    let result = await users.save();
    res.send(result)
})

app.listen(5000,()=>{
    console.log(`app is listening at 5000 port`)
})