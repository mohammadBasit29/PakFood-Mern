const express = require ('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult} = require('express-validator'); 
const jwt = require ("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "mynameisbasitshaikh";

// Create a user
router.post("/createuser",[body('email').isEmail(),
body('password','Incorrect Password').isLength({min:5}),
body('name').isLength({min:5})] ,
async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password,salt);


    try{
       await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location
        })
    res.json({success:true});    
    }
    catch (error){
        console.log(error);
        res.json({success:false});
    }
})

// login User

router.post("/loginuser",[body('email').isEmail(),
body('password','Incorrect Password').isLength({min:5})] ,async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    let email = req.body.email;
    try{
        // user is from schema
        // email se agar db se data nahi aya tou error
       let userdata = await User.findOne({email});
       if(!userdata)
       {
        return res.status(400).json({errors: "Try Login with corrrect credentials"})
       }
    //    agar email aagye magar pass match nahi tou error
    const passCompare = await bcrypt.compare(req.body.password,userdata.password) 

    //    if(req.body.password !== userdata.password)

       if(!passCompare)
       {
        return res.status(400).json({errors: "Try Login with corrrect credentials"})
       }
       const data = {
        user:{
            id : userdata.id
        }
       }
       const authToken = jwt.sign(data,jwtSecret)
       return res.json({success:true, authToken:authToken})

       

    }
    catch (error){
        console.log(error);
        res.json({success:false});
    }
})


module.exports = router;