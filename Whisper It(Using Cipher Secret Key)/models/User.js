const mongoose = require('mongoose');
const { isEmail } = require('validator');
const encrypt = require('mongoose-encryption');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Please Enter a Email'],
        unique : [true, 'The Email must be unique']
    },
    password : {
        type : String,
        required : true,
        minlength : [6, 'The Minimum Length of the Password should be 6']
    }

});

userSchema.plugin(encrypt, {secret : process.env.SECRET, encryptedField : ['password'] });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;