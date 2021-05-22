module.exports=function(req,res,next){
    //we assume this middleware runs after auth, because only then we will be able to access req.user.isAdmin
    if(!req.user.isAdmin) return res.status(403).send('Access denied...');
    //if user isAdmin then we forward request to delete route handler
    next();
}