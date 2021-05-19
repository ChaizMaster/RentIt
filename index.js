const mongoose=require('mongoose');
const Joi=require('joi');
const helmet=require('helmet');
const express=require('express');
const app=express();

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

// check for env PORT value else use 3000
const port=process.env.PORT||3000;
// setup endpoint on which server listens for http requests
app.listen(port,error=>{
    if(error)return console.log("Error in starting server!",error);
    console.log(`Server up and running on port ${port}`);
})