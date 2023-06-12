
const {Router} = require('express');

const {User} = require('../models/users.js');
const {Link} = require('../models/links.js');

const router = Router();


router.get('/links', async (req,res) =>{

try {
    

    const {authorization} = req.headers;
    const {expiredAt} = req.query;


    const user = await User.findOne({apiKey: authorization});

    if(!user)
    {
        return res.status(400).send("User with such credentials was not found");
    }


    const user_id = user._id;

    const expiredAt_parsed = JSON.parse(expiredAt);

    console.log(expiredAt_parsed);

    const links = await Link.find({
        userId: user_id,
        expiredAt: expiredAt_parsed

    });


    res.status(200).send(links);
    
    



} catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong');
}

})


module.exports = {router};