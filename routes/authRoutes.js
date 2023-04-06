const express = require("express");
const router = express.Router();
// const Product = require("../models/Product");
// const Review = require("../models/Review");
const User = require("../models/User");
const passport = require("passport");


router.get("/register",(req,res)=>{
    res.render("auth/signup")

})

// router.get("/fakeUser",async(req,res)=>{

//     const user = new User({username: "fakeUser",email: "abcd@gmail.com"});

//     const newUser = await User.register(user,"12345");

//     res.send(newUser);
// })


router.post("/register",async(req,res)=>{
    
    const {username,password,email} = req.body;

    const user = new User({username,email}) 

    const newUser = await User.register(user, password);

    req.flash("Success","You have been registered successfully")

    res.redirect("/login");

})


router.get("/login",(req,res)=>{
    res.render("auth/login");
})

// router.post("/login", (req,res)=>{
//     // res.redirect("/products");

// })

router.post("/login",passport.authenticate("local",{
    failureRedirect: "/login",
    // failureMessage: true,
    failureFlash: "Login Error!! Please Try Again.."


}), (req,res)=>{
    req.flash("success",`${req.user.username.toUpperCase()}, Your login was successfull`)
    res.redirect("/products");
})





// logout user from session
router.get('/logout', function(req, res, next) {
    req.logout(function(err) 
    {
      if (err) { return next(err); }
      req.flash('success', 'GoodBye, see you again!');
      res.redirect('/login');
    });
  });

module.exports=router;
