const mongoose = require('mongoose');
const { isEmail } = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');


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

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model('User', userSchema);

passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

module.exports = userModel;