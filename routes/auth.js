const {User}=require('../models/user');
const Joi=require('joi');
const _ =require('lodash');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();


//route handler to create new user in our app
  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //try and fetch user corresp to provided mail id
    let user=await User.findOne({email:req.body.email});
    //if the user entered an invalid email raise error
    if(!user) return res.status(400).send('Invalid email or password...');
    //check whether the entered password matches the user's password in DB
    const validPassword= await bcrypt.compare(req.body.password,user.password);
    //if password entered is incorrect raise an error
    if(!validPassword) return res.status(400).send('Invalid email or password...');
    // fetch jwt token by making a function call
    const token=user.generateAuthToken();
    //if everything went well confirm client's login
    res.send(token);
  });


//function to validate that input recieved from client is in the form we require
function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(50).required().email(),
      password:Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }




module.exports=router;





