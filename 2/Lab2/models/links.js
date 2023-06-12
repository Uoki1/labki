const { Schema, model, Types } = require("mongoose");



const shema = new Schema({
    userId: {type: Types.ObjectId, required: true},
    link: {
        original: {type: String, required: true},
        cut: {type: String, required: true, unique: true}
    },
    expiredAt: {type: Date}
})

const Link = new model('links', shema, 'links');


module.exports = {Link}