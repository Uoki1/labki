

const {Router} = require('express');
const {User} = require('../models/users.js');
const {Link} = require('../models/links.js');
const {generateApiKey} = require('generate-api-key');

const router = Router();


router.post('/links', async (req,res) =>{
    try {
        


        const {originalLink} = req.body;
        const {authorization} = req.headers;

        if(!originalLink)
        {
            return res.status(400).send("The link is a required field");
        }

        const user = await User.findOne({apiKey: authorization});

        if(!user)
        {
            return res.status(401).send('User is not authorized')
        }

        const short_link = generateApiKey({
            method: 'string',
            pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvmxyz0123456789',
            min: 10,
            max: 15
          });

        const userId = user._id;

        

        const doc = new Link({
            userId: userId,
            link: {
                original: originalLink,
                cut: short_link
            },
            expiredAt: SetDate()
        })

        const newLink = await doc.save();

        const linkResponse = {};

        linkResponse.link =  newLink.link.cut;
        linkResponse.expiredAt = newLink.expiredAt;

        res.status(200).send(linkResponse);






    } catch (error) {
        
        return res.status(400).send("Something went wrong");
    }


})




module.exports = {router}






function SetDate()
{
    const current_date = new Date;

    const current_day = current_date.getDate();

    current_date.setDate(current_day + 5);


    return current_date;


    
}