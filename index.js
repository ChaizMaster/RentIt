const express=require('express');
const app=express();

//call the function responsible for error handling
require('./startup/error-handling')();


//call the function responsible for all the routes and middleware
require('./startup/routes')(app);

//call the function responsible for connection to Db
require('./startup/db')();

//call the function responsible for jwt and config 
require('./startup/config')();

//call the function responsible for input validation using Joi
require('./startup/validation')();
// check for env PORT value else use 3000
const port=process.env.PORT||3000;
// setup endpoint on which server listens for http requests
app.listen(port,error=>{
    if(error)return console.log("Error in starting server!",error);
    console.log(`Server up and running on port ${port}`);
})





// We are following the SINGLE RESPONSIBILITY PRINCIPLE