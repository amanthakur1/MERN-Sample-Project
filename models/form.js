const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    }

});

mongoose.model("Form", userschema);