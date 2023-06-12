

const {Router} = require('express');

const {Theater} = require('../models/theaters.js')
const bodyParser = require('body-parser');

const router = Router();

router.use(bodyParser.json());

router.get('/theaters', async (req,res) =>{


    const {zipcode, city, lattitude, longitude} = req.query;

    


    const queryDb = {};

    if(city)
    {
        queryDb["location.address.city"] = city;
    }

    if(lattitude)
    {
        queryDb["location.geo.coordinates.0"] = lattitude;
    }

    if(longitude)
    {
        queryDb["location.geo.coordinates.1"] = longitude;
    }

    if(zipcode)
    {
        queryDb["location.address.zipcode"] = zipcode;
    }


    const docs = await Theater.find(queryDb);


    return res.status(200).json(docs);
})

module.exports = {router};