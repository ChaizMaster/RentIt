const mongoose=require('mongoose');
const Joi=require('joi');


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

//function to validate that input recieved from client is in the form we require
function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

exports.Genre=Genre;
exports.validateGenre=validateGenre;