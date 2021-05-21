const mongoose=require('mongoose');
require('express-async-errors');
const config=require('config');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const express=require('express');
const app=express();
//call the function responsible for all the routes and middleware
require('./startup/routes')(app);

//catch uncaughtExceptions throughout the node app and handle them (Note: it only works for sync code, for promises we need other handler)
process.on('uncaughtException',e=>{
    //usually we will log this error to DB
   console.log("Found an uncaught Exception in the node app",e);
   //if there's an error we should exit the process with a non zero code and let process manager restart the process, to keep the process
   //clean
   process.exit(1);
});

// handle unhandledRejections throughout the node app
process.on('unhandledRejection',e=>{
    //usually we will log this error to DB
    console.log("Found an unhandled Rejection in the node app",e);
    //if there's an error we should exit the process with a non zero code and let process manager restart the process, to keep the process
   //clean
   process.exit(1);
});
// before the app starts up we want to be sure that the privatekey for jwt is present as an environmental variable
// otherwise our authentication endpoint will fail

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined!');
    process.exit(1);
}

// connect to mongoDB via mongoose
mongoose.connect('mongodb://localhost/rentit',{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>console.log('Successfully connected to mongoDB...'))
        .catch(err=>console.error('Error in connecting to mongoDB'))



// check for env PORT value else use 3000
const port=process.env.PORT||3000;
// setup endpoint on which server listens for http requests
app.listen(port,error=>{
    if(error)return console.log("Error in starting server!",error);
    console.log(`Server up and running on port ${port}`);
})