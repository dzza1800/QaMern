const router = require("express").Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongo").then(res=>{
    console.log("connected");
}).catch(err => {
    console.log(err);
});
const EmploySchema = mongoose.Schema;
const subSchema = mongoose.Schema;
const PositionSchema = mongoose.Schema;
const depositSchema = mongoose.Schema;
module.exports = router;



const employees = new EmploySchema({
   name: String,
   age: Number,
   level_of_knowledge: Number,
});

const jobPositions = new PositionSchema({
    Job_Name: String,
    Position: String,
    Skills:[{
        firstSkill: String,
        secondSkill: String
    }]

 });

const mainEmployees = new subSchema({
    Employees: [employees],
    Positions: [jobPositions]
    
})
const deposit= new depositSchema({
    "Income":Number
})

const employeedata = mongoose.model("Employee", employees);
const jobData = mongoose.model("Job", jobPositions);
const getdata = mongoose.model("Data", mainEmployees);
const getMoney = mongoose.model("Income",deposit);

router.get('/GetAllData', (req, res) => {
    getdata.find({}).select('-_id -__v').then(db=>{
        res.send(JSON.stringify(db));
    }).catch(err => {
        console.log(err);
    })
});

router.get('/GetAll_Employees', (req, res) => {
    employeedata.find().select('-_id -__v').then(db=>{
        res.send(JSON.stringify(db));
    }).catch(err => {
        console.log(err);
    })
});

router.get('/GetAll_Jobs', (req, res) => {
    jobData.find({}).select('-_id -__v').then(db=>{
        res.send(JSON.stringify(db));
    }).catch(err => {
        console.log(err);
    })
});

router.post('/CreateEmployee', (req, res) => {
    employeedata.create(req.body).then(db=>{
        res.send(JSON.stringify(db));
        console.log(req.body);
    }).catch(err => {
        console.log(err);
    })
});

router.post('/CreateJobs', (req, res) => {
    jobData.create(req.body).then(db=>{
        res.send(JSON.stringify(db));
        console.log(req.body);
    }).catch(err => {
        console.log(err);
    })
});

router.post('/resetEmployees', (req, res) => {
    employeedata.collection.drop().then(db =>{
        res.send("Collection Dropped");
    })
})

router.post('/resetJobs', (req, res) => {
    jobData.collection.drop().then(db =>{
        res.send("Collection Dropped");
    })
})

router.put('/Update_Cashiers/:Job_Name', (req, res)=>{
    jobData.update({Job_Name: req.params.Job_Name}, req.body).then(db =>{
        console.log(db);
        res.send(db);
    }).catch(error  => {
        throw error;
    })
})

router.put('/Income', (req, res) =>{
    getMoney.findOne().then(db =>{
        req.body.Income += db;
        
    })
})


