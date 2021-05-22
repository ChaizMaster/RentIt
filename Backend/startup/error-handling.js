
require('express-async-errors');
//this function contains all the code for handling uncaught errors and exceptions, this was done so that we are
//able to extract the implementation details from index.js file and keep it clean and simple

module.exports=function(){
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
}