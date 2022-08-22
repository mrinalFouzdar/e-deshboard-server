const User = require("../Models/User")

const register = async(req,resp,next)=>{
        let password = req.body.password
    try {
        const newUser = new User({
            username:req.body.username,
            name:req.body.name,
            email:req.body.email,
            password:password
        })
        console.log(newUser);
       let data = await newUser.save()
    //    console.log(data);
        resp.status(200).send("User has been created")
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports={
    register
}