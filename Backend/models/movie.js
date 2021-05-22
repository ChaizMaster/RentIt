const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

// define structure of a document which will be stored inside Movie collection inside mongoDB
const movieSchema= new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true, 
      minlength: 5,
      maxlength: 255
    },
    genre: { 
      type: genreSchema,  
      required: true
    },
    numberInStock: { 
      type: Number, 
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: { 
      type: Number, 
      required: true,
      min: 0,
      max: 255
    }
  });
// define collection that will store documents structured adhering to their definition in movieSchema 
const Movie = mongoose.model('Movies',movieSchema);

//function to validate that input recieved from client is in the form we require  
function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validateMovie = validateMovie;