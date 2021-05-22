const mongoose=require('mongoose');
//this function contains all the code for setting up DB, this was done so that we are
//able to extract the implementation details from index.js file and keep it clean and simple

module.exports=function(){
    // connect to mongoDB via mongoose
    mongoose.connect('mongodb://localhost/rentit',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('Successfully connected to mongoDB...'))

}
        
