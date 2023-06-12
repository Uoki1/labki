const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const setupDB = require('./setupBdjs/index.js');


const getSales = require('./api/getSales.js');



const start = async () => {

    app.use(bodyParser.json());

    await setupDB(process.env.MONGO);

    getSales(app);


    // app.get('/sales', async (req, res) => {
    //     const { items_tags, storeLocation, customer_age, customer_emailDomain, couponUsed } = req.query;


    //     const queryDB = {};

    //     if (storeLocation) {
    //         queryDB.storeLocation = storeLocation;
    //     } else {
    //         queryDB.storeLocation = null;
    //     }



    //     if (customer_age) {
    //         const customer_age_parsed = JSON.parse(customer_age);

    //         if (customer_age.split('gt').length - 1 == 2 || customer_age.split('lt').length - 1 == 2) {
    //             return res.status(400).send("two equal parametrs were sent");
    //         }

    //         if (customer_age_parsed.gt >= customer_age_parsed.lt) {
    //             return res.status(400).send("Invalid values of gt and lt were passed");
    //         }

    //         if (customer_age_parsed.gt) {
    //             customer_age_parsed['$gt'] = customer_age_parsed['gt'];
    //             delete customer_age_parsed['gt'];
    //         }

    //         if (customer_age_parsed.lt) {

    //             customer_age_parsed['$lt'] = customer_age_parsed['lt'];
    //             delete customer_age_parsed['lt'];
    //         }




    //         queryDB['customer.age'] = customer_age_parsed;


    //     } else {
    //         queryDB['customer.age'] = null;
    //     }

    //     if (customer_emailDomain) {
    //         queryDB['customer.email'] = customer_emailDomain;
    //     } else {
    //         queryDB['customer.email'] = null;
    //     }

    //     if (items_tags) {
    //         const arrayOfTags = items_tags.split(',');
    //         console.log(arrayOfTags);

    //         queryDB["items.tags"] = arrayOfTags;
    //     } else {
    //         queryDB["items.tags"] = null;
    //     }

    //     if (couponUsed) {
    //         queryDB.couponUsed = couponUsed;
    //     } else {
    //         queryDB.couponUsed = null;
    //     }

    //     const doc = await SaleModel.find({
    //          // storeLocation: { $regex: `${queryDB.storeLocation}`, $options: `i` }, // need to check
    //          ["customer.age"]: queryDB['customer.age'],  //works 
    //          ["customer.email"]: {$regex: `${queryDB['customer.email']}$`, $options: `i`}, // works
    //          ["items.tags"]: {$in: queryDB['items.tags']},  // works
    //         couponUsed: queryDB.couponUsed  // works
    //     })



    //      console.log(doc);

    //     res.send(doc);
    // })






    app.listen(process.env.PORT, () => {
        console.log("Server was started on port ", process.env.PORT);
    })

}



start();