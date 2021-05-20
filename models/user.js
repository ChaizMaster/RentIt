const Joi=require('joi');
const jwt=require('jsonwebtoken');
const config=require('config');
const mongoose=require('mongoose');

//define structure of a document which will be stored inside User collection inside mongoDB
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024 // because we will hash password's so need higher values
    }

})

// we will add authentication and generate jwt functionality to userSchema so that it can be reusable
userSchema.methods.generateAuthToken=function(){
    // generate jsonwebtoken to send to client, we store the private key in env var and set var in config of the app
    // we use this so that it can fetch id of the object which in whose context the function is being called 
    const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token;
}

// define collection that will store documents structured adhering to their definition in userSchema 
const User=mongoose.model('User',userSchema);

//function to validate that input recieved from client is in the form we require
function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required().email(),
      password:Joi.string().min(5).max(255).required(),
      confirmPassword:Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }

exports.User=User;
exports.validateUser=validateUser;