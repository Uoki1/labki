

const {Router} = require('express');
const { SaleModel } = require('../models/sale.js');

const router = Router();



module.exports = (app) => {


    app.use(router);

    router.get('/sales',async (req,res) =>{
        const { items_tags, storeLocation, customer_age, customer_emailDomain, couponUsed } = req.query;
    
    
            const queryDB = {};
    
            if (storeLocation) {

                queryDB.storeLocation = storeLocation;

                if(storeLocation.indexOf('*') == storeLocation.length-1) {
                    const newStoreLocation = storeLocation.slice(0, -1);
                    queryDB.storeLocation = { $regex: `${newStoreLocation}.*`, $options: `i` }
                }

                if(storeLocation.indexOf('*') == 0) {
                    const newStoreLocation = storeLocation.slice(1);
                    queryDB.storeLocation = { $regex: `.*${newStoreLocation}`, $options: `i` }
                }

                if(storeLocation.includes('\*')) {
                    const substrings = storeLocation.split('\*');
                    console.log(substrings);
                    const begin = substrings[0];
                    const end = substrings[1];
                    queryDB.storeLocation = { $regex: `^${begin}.*${end}$`, $options: `i` }
                }

                
            } 
    
    
    
            if (customer_age) {
                const customer_age_parsed = JSON.parse(customer_age); 
    
                if (customer_age.split('gt').length - 1 == 2 || customer_age.split('lt').length - 1 == 2) {
                    return res.status(400).send("two equal parametrs were sent");
                }
    
                if (customer_age_parsed.gt >= customer_age_parsed.lt) {
                    return res.status(400).send("Invalid values of gt and lt were passed");
                }
    
                if (customer_age_parsed.gt) {
                    customer_age_parsed['$gt'] = customer_age_parsed['gt'];
                    delete customer_age_parsed['gt']; 
                }
    
                if (customer_age_parsed.lt) {
                    customer_age_parsed['$lt'] = customer_age_parsed['lt'];
                    delete customer_age_parsed['lt'];
                }
    
                queryDB['customer.age'] = customer_age_parsed;
    
    
            } else {
                queryDB['customer.age'] = {$ne: null};
            }
    
            if (customer_emailDomain) {
                queryDB['customer.email'] = {$regex: `${customer_emailDomain}$`, $options: `i`};
            } else {
                queryDB['customer.email'] ={$ne: null};
            }
    
            if (items_tags) {
                const arrayOfTags = items_tags.split(',');
                console.log(arrayOfTags);
    
                queryDB["items.tags"] = {$in: arrayOfTags};
            } 
    
            if (couponUsed) {
                queryDB.couponUsed = couponUsed;
            } 

            console.log(queryDB);
    
            const doc = await SaleModel.find(
                {
                storeLocation: queryDB.storeLocation, // done
                ["customer.age"]: queryDB['customer.age'],  //done 
                ["customer.email"]: queryDB['customer.email'], //done
                ["items.tags"]: queryDB['items.tags'],
                couponUsed: queryDB.couponUsed  // done
                }
            )

            console.log(doc);
    
            res.status(200).send(doc);
    })
    

}

