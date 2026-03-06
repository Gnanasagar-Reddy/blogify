
require("dotenv").config()
const path=require("path");
const express=require("express");
const userRoute=require("./routes/user.js")
const blogRoute=require("./routes/blog.js")
const cookieParser=require("cookie-parser");
const app=express();
const port=process.env.PORT || 3000;
const mongoose=require("mongoose");
const { checkForAuthenticationCookie } = require("./middleware/authentication.js");
const Blog=require("./models/blog.js")

mongoose.connect(process.env.MONGO_URL).then(e=>console.log("mongoDB connected"))
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))

app.get("/",async (req,res)=>{
const allBlogs=await Blog.find({});
res.render("home",{
   user:req.user,
   blogs:allBlogs,
});
})


app.use("/user",userRoute);
app.use("/blog",blogRoute);
app.listen(port, "0.0.0.0",()=>{
   console.log(`server is connected at port ${port}`);
})