const {User,validateUser}=require('../models/user');
const auth=require('../middleware/auth');
const _ =require('lodash');
const bcrypt=require('bcrypt');
const express=require('express');
const router=express.Router();

//route handler for users to look at their profile
//Note: we use me instead of id, to prevent a user to send another user's id and lookup sensitive info about that user
//using me we will extract user id using jwt and by verifying the signature
router.get('/me',auth,async (req,res)=>{
   //find user by fetching user id from jwt
    const user=await User.findById(req.user._id).select('-password');
    //send user info to the client
    res.send(user);
});

//route handler to create new user in our app
  router.post('/',async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //check if the user is not already registered
    let user=await User.findOne({email:req.body.email});
    //if the user exists notify the client
    if(user) return res.status(400).send('User already registered');
    //check if the user has entered the password he/she intended
    if(req.body.password!==req.body.confirmPassword) return res.status(400).send('password and confirm password do not match!');
    //if user is not registered create a new user object and save the new user in DB
    user=new User(_.pick(req.body,['name','email','password']));
    //hash the user's password before storing in DB
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    //save the user in Db
    await user.save();
    // we would like the registered users to get directly logged in to the app, so we will send jsonwebtoken
    // for the user in the response header  
    // fetch jwt token by making a function call
    const token=user.generateAuthToken();
    //send the newly created user back to the client, but we wouldn't like to send password to the client as info 
    //so we filter it out 
    res.header('x-auth-token',token)
    .send(_.pick(user,['_id','name','email']));//custom headers are prefixed with x-followedbyrandomname
  });







module.exports=router;





