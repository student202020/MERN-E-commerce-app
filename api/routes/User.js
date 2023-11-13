const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");


const router = express.Router()

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) =>{
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try{
     const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        {new:true})
        res.json(updatedUser)
     
    }catch(err){res.json("Error")}

})

//DELETE
router.delete("/:id", verifyTokenAndAdmin,  async (req, res) =>{
    
    try{
     await User.findByIdAndDelete(req.params.id)
        res.json("User deleted")
     
    }catch(err){return console.log("Error")}

})

//GET ONE
router.get("/:id",   async (req, res)=>{
    try{
    const user = await User.findById(req.params.id)
    const { password, ...others } = user;
    res.json(...others)
    }catch(err){res.json("Error")}
})

//GET ALL
router.get("/",  async (req, res)=>{
    try{
        const query = req.query.new;
    const users = query ? await User.find().sort({ id: -1 }).limit(5) : await User.find()
    
    res.json(users)
    }catch(err){res.json("Error")}
})
module.exports = router;