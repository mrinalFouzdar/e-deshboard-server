const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

UserSchema.pre("save" , async function(next){
 if(this.isModified("password")){
    // console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password,10)
    // console.log(`the current password is ${this.password}`);
    next()
    
 }
})

module.exports =new mongoose.model("User",UserSchema)