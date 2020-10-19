const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

//schema for user registeration fields
let UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// export this schema outside this file
module.exports = UserSchema = mongoose.model('user', UserSchema);

