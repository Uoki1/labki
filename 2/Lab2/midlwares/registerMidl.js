

const {User} = require('../models/users.js');

const checkRegister = async (req,res,next) =>{

    const {email, password} = req.body;

    if(!email){
      return res.status(400).send('The email field is required');
    }

    if(!password)
    {
      return res.status(400).send('The password field is required');
    }

    const user = await User.findOne({email});       //Перевірка чи немає такого user з таким email

    if(user)
    {
      return res.status(400).send('This email is already in use');       //Якщо user вже існує то ми не можемо стоврити нового по тому самому email
    }


    next();
}

module.exports = {checkRegister};