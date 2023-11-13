const express = require("express");
const bcrypt = require("bcrypt");
const Products = require("../models/Products.js");
const { verifyTokenAndAdmin } = require("./verifyToken");


const router = express.Router()

//CREATE

router.post("/", verifyTokenAndAdmin, async (req,res) =>{

    const newProduct = new Products(req.body)
    try{

        const savedProduct = await newProduct.save()
        res.json(savedProduct)
    }catch(err){return console.log("Error")}
})
//UPDATE
router.put("/:id", verifyTokenAndAdmin,  async (req, res) =>{
    
    try{
     const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        {new:true})
        res.json(updatedProduct)
     
    }catch(err){return console.log("Error")}

})

//DELETE
router.delete("/:id",  verifyTokenAndAdmin,  async (req, res) =>{
    
    try{
     await Products.findByIdAndDelete(req.params.id)
        res.json("Product deleted")
     
    }catch(err){res.json("Error")}

})

//GET ONE
router.get("/:id",  async (req, res)=>{
    try{
    const product = await Products.findById(req.params.id)
    
    res.json(product)
    }catch(err){res.json("Error")}
})

//GET ALL
router.get("/",  async (req, res)=>{
    try{
   
    const products = await Products.find()
    
    res.json(products)
    }catch(err){res.json("Error")}
})
module.exports = router;