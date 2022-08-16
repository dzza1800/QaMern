const router = require("express").Router();
const mongoose = require("mongoose");
let errMessage = new Error("Error, fix the problem and then proceed\n");

const app = mongoose.connect("mongodb://localhost:27017/mongo").then(res=>{
    console.log("connected");
}).catch(err => {
    console.log(err);
})


//middleware logging
router.use((req, res, next) => {
    const log = [{"ip": req.ip},{"Method":req.method}, {"time":new Date()} ,{"URL":req.url}];
    console.log(log);
    next();
});
//sending a post to the url 
router.post("/db", (req, res) =>{
    console.log(req.body);
    res.send("got it");
});