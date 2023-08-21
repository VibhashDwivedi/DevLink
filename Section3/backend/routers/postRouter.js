const express = require('express');

const router = express.Router();
const Model = require('../models/postModel');





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

router.get('/getbyid/:id',(req,res)=>{
  console.log(req.params.id);
  Model.findById(req.params.id)
  .then((result) => {
      res.json(result);
  }).catch((err) => {
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

router.put('/:id/likes', async (req, res) => {
 
const postId = req.params.id; 
try {
  const updateddata = await Model.findByIdAndUpdate(

      postId,
      { $inc: { likes: 1 } }, // Increment likes count by 1
      { new: true } // Return the updated book
  );

  res.status(200).json(updateddata);
} catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Error updating likes', error });
}
});


router.put('/:id/dislikes', async (req, res) => {
 
const postId = req.params.id; 
try {
  const updateddata = await Model.findByIdAndUpdate(

      postId,
      
      { $inc: { likes: -1 } }, // decrement likes count by 1
      { new: true } // Return the updated book
  );

  res.status(200).json(updateddata);
} catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Error updating likes', error });
}
});

router.put('/update/:id',(req,res)=>{
  Model.findByIdAndUpdate(req.params.id, req.body,{new:true})
  .then((result) => {
      res.json(result);
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
  })

  router.delete('/delete/:id',(req,res)=>{
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
})

module.exports = router;