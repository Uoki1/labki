
const { Router} = require('express')
const jwt = require('jsonwebtoken');

const {CheckUser} = require('../validation/validation.js');
const {validationResult} = require('express-validator');
const {User} = require('../models/users.js')
const {checkRegister} = require('../midlwares/registerMidl.js');
const {generateApiKey} = require('generate-api-key');

const router = Router();


router.post('/users', CheckUser, checkRegister, async (req,res) => {

    try {

        const CheckErrors = validationResult(req);

    if(!CheckErrors.isEmpty())                  //Перевірка чи є якісь результи в перевірці валідації
    {
        return res.status(400).send(CheckErrors.array());
    }

    const {email, password} = req.body;

    let token = generateApiKey();


    const tokenExcist = await User.findOne({apiKey: token});
    while(tokenExcist)
    {
        token = generateApiKey();
        tokenExcist = await User.findOne({apiKey: token})
    }


   
    

    const doc = new User({
        password: password,
        email: email,
        apiKey: token
    })

    const newUser = await doc.save();

    


    res.status(200).send(newUser);
        
    } catch (error) {
        console.log(error);
        return res.send('Щось пішло не так');
        
    }
    
})


module.exports = {router};