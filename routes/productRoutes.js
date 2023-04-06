const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Review = require("../models/Review")
const {isLoggedIn} = require("../middleware")

// get all products
router.get("/products", async(req,res)=>{

   const products =  await Product.find({});

   // const message = req.flash("success")


   res.render("./products/product" , {products});
   // res.render("./products/product" , {products});

})


// get forms to create a new product
router.get("/products/new", async(req,res)=>{

     res.render("./products/new")
 
 })


 //create a new product
 router.post("/products", async(req,res)=>{

    const {name , img , desc , price} = req.body;

    await Product.create({name , img , desc , price});

    req.flash("success","Your Product has been added successfully");

     res.redirect("/products")

 });


 //show a single product
 router.get("/products/:productid",isLoggedIn, async(req,res)=>{

    const {productid} = req.params;

        const product = await Product.findById(productid).populate("review");

      //   console.log(product)
      //   const updateMessage = req.flash('update');


        res.render("./products/show", {product})
  
 })


 // get the edit form
 router.get("/products/:productid/edit",isLoggedIn, async(req, res)=>{

        const {productid} = req.params;

        const product = await Product.findById(productid);

        res.render("./products/edit" , {product})

 })


 //update a product
 router.patch("/products/:productid" , async(req,res)=>{

    const {name , img , price, desc } = req.body;

    const {productid} = req.params;

    await Product.findByIdAndUpdate(productid , { img , price , desc, name });

    req.flash("update","Your Product has been updated Sucessfully");

    res.redirect(`/products/${productid}`);


 })


 // delete a product
 router.delete("/products/:productid", async(req,res)=>{


    const {productid} = req.params;

    await  Product.findByIdAndDelete(productid);

    res.redirect("/products")

 })


module.exports = router;