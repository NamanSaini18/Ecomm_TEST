if(process.env.NODE_ENV != "production")
{
  require("dotenv").config()
}
const express = require("express");
const path = require("path")
const engine = require("ejs-mate")
const app = express();
// const PORT = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session")
const User = require("./models/User");
const flash = require("connect-flash");
const passport = require("passport");
var LocalStrategy = require("passport-local");

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/shopping-cart"

const port = process.env.PORT || 5000

const sessionSecret = process.env.SESSION_SECRET || 'this is a secret session'

const sessionflash = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    expires: Date.now() + 7*24*60*60*1000
  }
};

app.use(session(sessionflash))
app.use(flash());
app.use(passport.authenticate('session'));


app.use((req, res, next) => {

  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();

});
// app.use((req,res,next)=>{
//   res.locals.success = req.flash("update");

// })


// All Product Routes
const productRouter = require("./routes/productRoutes");

//Review Routes

const reviewRouter = require("./routes/reviewRoutes")

// Auth Routes
const authRouter = require("./routes/authRoutes");
// const passport = require("passport");

// Middlewares
app.use(session(sessionflash))
app.use(flash());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.engine("ejs", engine)
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));


// Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Connect to DB
mongoose.connect(dbUrl)
.then(()=> console.log(" DB CONNECTED!"))
.catch((err)=> console.log(err));


app.get("/", (req,res)=>{

    res.render("index");
})



// Routers
app.use(productRouter);  // using router
app.use(reviewRouter);
app.use(authRouter);





app.listen(port, ()=>{
    console.log(`Server is running successfully at port ${port}`);
})

// namansaini
// GmsVSxgCxYkuBFj0