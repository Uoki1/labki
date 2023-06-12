

const {model, Schema} = require('mongoose');


const schema = new Schema({
    saleDate: Date,
    items: [{name: String, tags: [String], price: Number, quantity: Number}],
    storeLocation: String,
    customer: {gender: String, age: Number, email: String, satisfation: Number},
    couponUsed: Boolean,
    purchaseMethod: String

})

const SaleModel = new model('sales', schema, 'sales');


module.exports = {SaleModel};