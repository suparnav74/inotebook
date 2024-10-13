const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    Obj ={
        a : 'suparna',
        number : 30
    }
    res.json(Obj)
})

module.exports = router