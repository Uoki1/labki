const {Router} = require('express');

const {Theater} = require('../models/theaters.js');

const router = Router();


router.get('/theater/:theaterId', async (req, res) =>{
    const {theaterId } = req.params;

    const queryDB = {};

    
    if(theaterId)
    {
        queryDB.theaterId  = theaterId ;
    }

    const docs = await Theater.find(queryDB);

    return res.status(200).send(docs);
})

module.exports = {router}