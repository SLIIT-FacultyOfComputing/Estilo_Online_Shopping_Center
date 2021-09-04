const router = require("express").Router();
let Employee = require("../models/Employee");




router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newEmployee = new Employee({

        name,
        age,
        gender
    })

    newEmployee.save().then(()=>{
        res.json("Employee Added")

    }).catch((err)=>{
        console.log(err);
    })


})



router.route("/").get((req,res)=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const{name,age,gender} =req.body;

    const updateEmployee = {
        name,
        age,
        gender

    }
 const update = await Employee.findByIdAndUpdate(userId, updateEmployee)
 .then(()=>{
    res.status(200).send({status:"User updated",user: update})
 }).catch((err)=>{
     console.log(err);
     res.status(500),send({status:"Error with updating data", eror:err.message});
 })

})



router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    awaitEmployee.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error:err.message});

    })

})


module.exports = router;
