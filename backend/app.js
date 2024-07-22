const express = require("express");
const mongoose = require("mongoose");


const mongoURI= ''
mongoose.connect(mongoURI)
    .then(()=> console.log('connected to mongodb'))
    .catch(()=> console.log('failed to connect to mongodb'));

const app = express();

//cors sec
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

//add here calls to routes

app.listen(5001,  ()=>{
    console.log("server is running on port 5001")
});

module.exports=app;