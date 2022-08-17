//using router instead of connecting and then running, this makes cleaner code.
const router = require("express").Router();
const cow = require("cowsay");
const joke = require("one-liner-joke");
let Text = JSON.stringify(joke.getRandomJokeWithTag("puns"));
let cowsay = (text) => cow.say({'text': text}); 

let errMessage = new Error("Error, fix the problem and then proceed\n");

let names = ["Jack", "Mongo", "Java"];

//middleware logging
router.use((req, res, next) => {
    const log = [{"ip": req.ip},{"Method":req.method}, {"time":new Date()} ,{"URL":req.url}];
    console.log(log);
    next();
});
//sending a post to the url 
router.post("/hi", (req, res) =>{
    console.log(req.body);
    res.send("got it");
});
//sending a list, (below is also sending a body to a url)
router.post('/add', (req, res) => {
    let nay = "HAIII";
    names.push(nay);
    res.send(names);
    
});

let b = [{"id": 1, "name": "Jerry", "age": 12567, "job": "Being alive"}, 
{"id": 2, "name": "Gary", "age": 34, "job": "Chav"}];
router.put('/body', (req, res) => {
    res.send(b);
});
//square function
function square(id){
    return id * id;
}
//similar to a delete function but this case is a get, doing a calculation with a paramter
router.get('/calculate/:id', (req, res, next) => {
    let id = req.params.id;
    if(isNaN(id)){
        next(errMessage);
    }
    else{
        res.send(" "+ square(id));
    }
});

//cowsay on server
router.get('/cow', (req, res) => {
    let id = req.params.id;
    res.send(cowsay(Text));
});

module.exports = router;
