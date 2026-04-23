const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = process.env.JWT_SECRET;

// Route 1: Create a User using: POST "/api/auth/createuser". No login reqired
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','enter a valid email address').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min : 5})
],async (req,res)=>{
  let success =false;
    // If there are errors, return Bad request and error message
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      //Check whether user with this email exist already
     try {
       let user = await User.findOne({email :req.body.email});
       if(user){
         return res.status(400).json({success,error :"Sorry a user with this email address already exist"})
       }

       const salt = await bcrypt.genSalt(10);
       const secPass = await bcrypt.hash(req.body.password,salt);
       // Create a new user
       user = await User.create({
       name : req.body.name,
       password : secPass,
       email : req.body.email
      })
     } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
     }
     
    //  .then(user=>res.json(user)).catch(err=>{console.log(err)
    //   res.json({error : "please enter a unique value for email ",message:err.message})
    //  });
     const data = {
      user : {
        id : user.id
      }
     }
     const authToken = jwt.sign(data,JWT_SECRET);
     console.log(authToken);
     success=true;
     //res.json(user)
     res.json({success,authToken});
})


// Route 2 : Authenticate a User using: POST "/api/auth/login". No login reqired
router.post('/login',[

    body('email','enter a valid email address').isEmail(),
    body('password','password cannot be blank').exists()
  
],async (req,res)=>{

  // If there are errors, return Bad request and error message
  const errors = validationResult(req);
  let success =false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
try {
  
  let user = await User.findOne({email});
  if(!user)
  {
    success =false;
    return res.status(400).json({error :"Please try to login with correct credentials"});
  }

  const passwordCompare = await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success =false;
    return res.status(400).json({error :"Please try to login with correct credentials"});
  }
  const data = {
    user : {
      id : user.id
    }
   }
   const authToken = jwt.sign(data,JWT_SECRET);
   success = true;
   res.json({success,authToken});
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})

// Route 3 : Get loggedin  User details using: POST "/api/auth/getuser". Login reqired
router.post('/getuser',fetchuser,async (req,res)=>{
try {

  let userId =req.user.id;
  const user = await User.findById(userId).select("-password")
  console.log(user)
  res.send(user);

} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})
module.exports = router