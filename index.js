const { response } = require("express");
const express = require("express");
const cors = require("cors");
const User = require("./db/User");
require("./db/config");
const app = express();

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let users = new User(req.body);
  let result = await users.save();
  result= result.toObject();
  delete result.password
  res.send(result);
});

app.post("/logIn", async (req, res) => {
  let { password, email } = req.body;
  if (password && email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.listen(5000, () => {
  console.log(`app is listening at 5000 port`);
});
