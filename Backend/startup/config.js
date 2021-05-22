const config=require('config');

//this function contains all the code for config settings and jwt , this was done so that we are
//able to extract the implementation details from index.js file and keep it clean and simple

module.exports=function(){
    // before the app starts up we want to be sure that the privatekey for jwt is present as an environmental variable
// otherwise our authentication endpoint will fail

if(!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined!');
}

}