const jwt=require('jsonwebtoken');
const config=require('config');
//we want to make sure that the client is authenticated to make changes in our app,
//we will check the request headers for jwt to verify the client
module.exports=function(req,res,next){
    //extract the jwt from request header
    const token=req.header('x-auth-token');
    // if the token isn't available raise a 401 forbidden error
    if(!token) return res.status(401).send('Access denied. No token provided.')
    //verify if the jwt is valid. If valid we recieve a object which is the payload,else error is raised
    try{
        const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
        //we add this payload to req.user obj to be used for further processing throughout app
        req.user=decoded;
        //pass control forward in the request processing pipeline
        next();
    }catch(e){
        return res.status(400).send('Invalid Token...');
    }
    

}