const { Schema, model } = require('mongoose');


const shema = new Schema({
user_id: {type: String},
jwt: {type: String}
})


const Session = new model('sessions', shema, 'sessions');

module.exports = {Session}