const {Router} = require('express');

const router = Router();

const {Session} = require('../models/sessions.js');


router.get('/sessions', async (req,res) =>{
    const {user_id} = req.query;


    const queryDB = {};

    if(user_id)
    {
        queryDB.user_id = user_id;
    }

    const docs = await Session.find(queryDB);

    return res.status(200).send(docs);
})


module.exports = {router};