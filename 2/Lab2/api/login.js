

const {Router} = require('express');
const { validationResult } = require('express-validator');

const {CheckUser} = require('../validation/validation.js');
const {User} = require('../models/users.js');


const router = Router();


router.post('/users/login', CheckUser, async (req,res) =>{

    try {

        const CheckErrors = validationResult(req);

        if(!CheckErrors.isEmpty())
        {
            return res.status(400).send(CheckErrors.array());
        }

        const {email, password} = req.body;

        if(!email)
        {
            return res.status(400).send('The email field is required');
        }

        if(!password){
            return res.status(400).send('The password field is required');
        }

        const user = await User.findOne({email});

        if(user)
        {
            if(password == user.password){
                return res.status(200).send(user);
            }
            else{
                return res.status(400).send('User with such credentials was not found');
            }
        } else {

            return res.status(400).send('User with such credentials was not found');
        }

        
    } catch (error) {
        
        return res.status(404).send("Something went wrong");
    }

})


module.exports = {router};