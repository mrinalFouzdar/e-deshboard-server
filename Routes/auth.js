const express = require("express");
const { register, logIn } = require("../Controller/auth.controller");
const router = express.Router()
// console.log("router",router);

router.post("/register",register)
router.post("/logIn",logIn)

module.exports= router