const Joi = require('joi');

const mongoose = require('mongoose');

// define structure of a document which will be stored inside Rental collection inside mongoDB
const rentalSchema=new mongoose.Schema({
    customer: { 
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
        isGold: {
          type: Boolean,
          default: false
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        }      
      }),  
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true, 
          minlength: 5,
          maxlength: 255
        },
        dailyRentalRate: { 
          type: Number, 
          required: true,
          min: 0,
          max: 255
        }   
      }),
      required: true
    },
    dateOut: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    dateReturned: { 
      type: Date
    },
    rentalFee: { 
      type: Number, 
      min: 0
    }
  });

// define collection that will store documents structured adhering to their definition in rentalSchema 
const Rental = mongoose.model('Rental',rentalSchema );


//function to validate that input recieved from client is in the form we require
function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validateRental = validateRental;