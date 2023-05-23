const mongoose = require('mongoose');

// TODO!! ADD: photo, contact info, highschool info, 

const schema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    username: {
        required: true,
        unique: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    type: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('User', schema);
