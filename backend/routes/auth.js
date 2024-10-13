const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/createuser". No login reqired
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','enter a valid email address').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min : 5})
],async (req,res)=>{
    // If there are errors, return Bad request and error message
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //Check whether user with this email exist already
     try {
       let user = await User.findOne({email :req.body.email});
       if(user){
         return res.status(400).json({error :"Sorry a user with this email address already exist"})
       }
       // Create a new user
       user = await User.create({
       name : req.body.name,
       password : req.body.password,
       email : req.body.email
      })
     } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
     }
     
    //  .then(user=>res.json(user)).catch(err=>{console.log(err)
    //   res.json({error : "please enter a unique value for email ",message:err.message})
    //  });
     res.json(user)
})


module.exports = router