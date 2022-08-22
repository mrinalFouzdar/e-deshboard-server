const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true
    },
    price:{
        type:String,
        required:true,
        // unique:true
    },
    userId:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("products",productSchema)