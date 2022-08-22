const express = require("express");
const { register } = require("../Controller/auth.controller");
const router = express.Router()
// console.log("router",router);

router.post("/register",register)

module.exports= router