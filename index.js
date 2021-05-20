const mongoose=require('mongoose');
const config=require('config');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const helmet=require('helmet');
const express=require('express');
const app=express();


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

//to  parse and add json to body
app.use(express.json());
//to parse and add form data to body
app.use(express.urlencoded({extended:true}));
//to add static files like css,html,js to our app
app.use(express.static('public'));
//for securing http requests
app.use(helmet());

//redirect all traffic for genres to a genre route handler
app.use('/api/genres',require('./routes/genres'));

//redirect all traffic for customers to a customer route handler
app.use('/api/customers',require('./routes/customers'));

//redirect all traffic for movies to a movie route handler
app.use('/api/movies',require('./routes/movies'));

//redirect all traffic for rentals to a rental route handler
app.use('/api/rentals',require('./routes/rentals'));

//redirect all traffic for users to a user route handler
app.use('/api/users',require('./routes/users'));

//redirect all traffic for authentication to a auth route handler
app.use('/api/auth',require('./routes/auth'));

// check for env PORT value else use 3000
const port=process.env.PORT||3000;
// setup endpoint on which server listens for http requests
app.listen(port,error=>{
    if(error)return console.log("Error in starting server!",error);
    console.log(`Server up and running on port ${port}`);
})