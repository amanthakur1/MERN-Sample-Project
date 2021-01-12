const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT ||5000;
const {MONGOURI} = require('./config/keys');

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB...');
});

mongoose.connection.on('error',(err)=>{
    console.log('Error Connecting MongoDB...',err);
});


require('./models/form');


app.use(express.json());
app.use(require('./routes/form'));

// for heroku-----------
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const server = app.listen(PORT,()=>{
    console.log("[SERVER RUNNING PORT:",PORT,"]");
});
