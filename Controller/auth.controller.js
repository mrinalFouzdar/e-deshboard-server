const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createError = require("../utils/error")
// const { now } = require("mongoose")


const register = async(req,resp,next)=>{
        let password = req.body.password
    try {
        const newUser = new User({
            username:req.body.username,
            name:req.body.name,
            email:req.body.email,
            password:password
        })

        // Creating Token
        const token = jwt.sign({id:newUser._id.toString(),isAdmin:newUser.isAdmin},process.env.JWTTOKEN)
        newUser.token = newUser.token.concat({token})
        
       let data = await newUser.save()
    //    console.log(data);
        resp.cookie("access_token",token,{expires:new Date(Date.now() + 1000 * 60 * 60 *60), httpOnly:true}).status(200).send("User has been created")
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const logIn = async(req,resp,next)=>{
    try {
        const{email,password} =req.body
        const user = await User.findOne({email:email})
        if(!user){
            return next(createError(404,"User not found!"))
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            next(createError(400, "Wrong password or username!"))
        }else{
        const token = jwt.sign({id:user._id.toString(),isAdmin:user.isAdmin},process.env.JWTTOKEN)
        user.token = user.token.concat({token})
        // console.log(user)
        await user.save()


            resp.cookie("jwt",token,{expires:new Date(Date.now()+1000 * 60),httpOnly:true}).status(200).send("Login Sucsses")
        }
        
    } catch (error) {
        next(error)
    }
}


module.exports={
    register,
    logIn
}