const mongoose = require('mongoose');
mongoose.pluralize(null);


const  UserSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    }

});

const User = mongoose.model('users', UserSchema);

module.exports = User;