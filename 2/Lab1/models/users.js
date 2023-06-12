

const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    _id:{type: String}
})

const users = new model('users', UserSchema, 'users');

module.exports={users}