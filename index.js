const helmet=require('helmet');
const express=require('express');
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/genres',require('./routes/genres'));







const port=process.env.PORT||3000;
app.listen(port,error=>{
    if(error)return console.log("Error in starting server!",error);
    console.log(`Server up and running on port ${port}`);
})