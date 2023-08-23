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

//router to get a user by username
router.get('/getbyusername/:username',(req,res)=>{
  console.log(req.params.username);
  Model.findOne({username:req.params.username})
  .then((result) => {
      res.json(result);
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
  });


  // router to get a user by id
router.get('/getbyid/:id',(req,res)=>{
  console.log(req.params.id);
  Model.findById(req.params.id)
  .then((result) => {
      res.json(result);
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
  }
  );


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

//check if the user is already present using email
router.get('/checkemail/:email',(req,res)=>{

  //return 200 if email is available and 401 if not available
  Model.find({email:req.params.email})
  .then((result) => {
      if(result.length === 0)
      res.status(200).json();
      else
      res.status(401).json();
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
});

//check if the user is already present using username
router.get('/checkusername/:username',(req,res)=>{

  //return 200 if username is available and 401 if not available
  Model.find({username:req.params.username})
  .then((result) => {
      if(result.length === 0)
      res.status(200).json();
      else
      res.status(401).json();
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
});


module.exports = router;