
const {Router} = require('express');


const {users} = require('../models/users.js');

const router = Router();


router.get('/users', async (req,res) =>{
    const {name, email} = req.query;

    const queryDB = {};

    if(name){
        queryDB.name = name;
    }

    if(email){
        queryDB.email = email;
    }

 
 

    const docs = await users.find(queryDB);

    return res.status(200).send(docs);
})


module.exports = {router};



