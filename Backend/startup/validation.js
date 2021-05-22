const Joi=require('joi');


//this function contains all the code for input validation , this was done so that we are
//able to extract the implementation details from index.js file and keep it clean and simple


module.exports=function(){
    //add objectId to joi for input validation
    Joi.objectId=require('joi-objectid')(Joi);
}