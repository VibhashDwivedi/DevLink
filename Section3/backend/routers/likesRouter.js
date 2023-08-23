const express = require('express');

const router = express.Router();
const Model = require('../models/likesModel');



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

router.get('/getall',(req,res)=>{

    Model.find({})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
});

//delete by post id

router.delete('/delete/:postId',(req,res)=>{
    const postId = req.params.postId;
    //delete by post id
    Model.findOneAndDelete({postId:postId})
    .then((result) => {
        res.json(result);
        console.log(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
});


module.exports = router;    