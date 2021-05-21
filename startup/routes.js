const helmet=require('helmet');
const express=require('express');


//this function contains all the code for setting up routes and middleware, this was done so that we are
//able to extract the implementation details from index.js file and keep it clean and simple
module.exports=function(app){
    //to  parse and add json to body
app.use(express.json());
//to parse and add form data to body
app.use(express.urlencoded({extended:true}));
//to add static files like css,html,js to our app
app.use(express.static('public'));
//for securing http requests
app.use(helmet());

//redirect all traffic for genres to a genre route handler
app.use('/api/genres',require('../routes/genres'));

//redirect all traffic for customers to a customer route handler
app.use('/api/customers',require('../routes/customers'));

//redirect all traffic for movies to a movie route handler
app.use('/api/movies',require('../routes/movies'));

//redirect all traffic for rentals to a rental route handler
app.use('/api/rentals',require('../routes/rentals'));

//redirect all traffic for users to a user route handler
app.use('/api/users',require('../routes/users'));

//redirect all traffic for authentication to a auth route handler
app.use('/api/auth',require('../routes/auth'));
}