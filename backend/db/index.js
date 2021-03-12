const mongoose = require('mongoose');
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const dbname=process.env.DB_NAME;
const connectionString="mongodb+srv://"+username+":"+password+"@cluster0.qmtm0.mongodb.net/"+dbname+"?retryWrites=true&w=majority"

mongoose.connection.on('error', err => {
    global.log(err,__filename,'e');
});

function Connect(){
    return new Promise((resolve,reject)=>{
        mongoose.connect(connectionString, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                keepAlive:true, 
                useFindAndModify: false,
                useCreateIndex:true,
            })
        .then((res)=>{
            global.log("DB connection successful",__filename,'s');
            resolve();
        })
        .catch((e)=>{
            global.log("DB connection error " + e,__filename,'e',"Connect");
            reject();
        })
    })
}

module.exports={
    Connect
}