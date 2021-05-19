const mongoose=require('mongoose');
const Joi=require('joi');


// define structure of a document which will be stored inside Customer collection inside mongoDB
const customerSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true,
      minlength:5,
      maxlength:50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:12
    }
});

// define collection that will store documents structured adhering to their definition in customerSchema 
const Customer=mongoose.model('Customer',customerSchema);


//function to validate that input recieved from client is in the form we require  
function validateCustomer(genre) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(10).max(12).required(),
      isGold:Joi.boolean()
    };
  
    return Joi.validate(genre, schema);
  }

exports.Customer=Customer;
exports.validateCustomer=validateCustomer;