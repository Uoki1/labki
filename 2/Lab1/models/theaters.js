const {model, Schema} = require('mongoose');


const shema = new Schema({
    theaterId: {
        type: Number
    },

    location: {
        address:{
            street1: {type: String},
            city: {type: String},
            state: {type: String},
            zipcode: {type: String}
        },
        
        geo: {
            type:{type: String},
            coordinates: {
                0:{type: Number},
                1: {type: Number}
            }
        }
        
    }

})

const Theater = new model('theaters', shema, 'theaters');

module.exports = {Theater}


