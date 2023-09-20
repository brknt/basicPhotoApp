const mongoose = require('mongoose');


const conn = ()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Connected to the DB successfully");
    }).catch((err)=>{
        console.log('DB connection err: ', err);    
    });
}

module.exports = conn;