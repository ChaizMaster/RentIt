const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const router=express.Router();

// define structure of a document which will be stored inside Genre collection inside mongoDB
const genreSchema=new mongoose.Schema({
      name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
      }
});
// define collection that will store documents structured adhering to their definition in genreSchema 
const Genre=mongoose.model('Genre',genreSchema);

//route handler to fetch all genres available in our application
  router.get('/', async (req, res) => {
    const genres=await Genre.find().sort('name');
    res.send(genres);
  });

//route handler to fetch only a single genre based on the id passed
router.get('/:id',async (req, res) => {
  //try and find genre corresponding to the id provided
  const genre = await Genre.findById(req.params.id);
  //if genre doesn't exist rasie a 404 error
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  //otherwise return the genre to the client
  res.send(genre);
});

//route handler to add genre to the app 
  router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({name: req.body.name});
    genre=await genre.save();
    res.send(genre);
  });
// route handler to update genre in the app
  router.put('/:id', async (req, res) => {
    //validate whether data sent by client is valid
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    //try and update the new value
     const genre= await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name },{new:true});
    //if genre is not found raise 404 error
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    //if all went well return the updated genre to the client
    res.send(genre);
  });
// route handler to delete a genre from app 
  router.delete('/:id',async (req, res) => {
    //try removing genre using it's id from DB
    const genre=await Genre.findByIdAndRemove(req.params.id);
    //if genre is not present then raise a 404 error
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  //if deletion is successful then return the genre which was just deleted to the client
    res.send(genre);
  });

  //function to validate that input recieved from client is in the form we require
  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

module.exports=router;