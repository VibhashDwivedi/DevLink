const express = require('express');


const router = express.Router();
const Model = require('../models/userModel');





router.post('/add',(req,res)=>{
    console.log(req.body);
    res.send('response from user add')
    //saving the data to mongodb
    new Model(req.body).save()
    .then((result) => {
      //res.json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json();
    });
});

router.post('/authenticate',(req,res)=>{
  Model.findOne(req.body)
  .then((result) => {
      if(result !== null)
      res.json(result);
      else
      res.status(401).json({message:'login failed'})
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
})



router.get('/getall',(req,res)=>{

  Model.find({})
  .then((result) => {
      res.json(result);
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
});


module.exports = router;