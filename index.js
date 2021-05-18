const express=require('express');
const app=express();




















const port=process.env.PORT||3000;
app.listen(port,error=>{
    if(error)return console.log("Error in starting server!",error);
    console.log(`Server up and running on port ${port}`);
})