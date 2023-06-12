

const {Router} = require('express');
const {Link} = require('../models/links.js')


const router = Router();


router.get('/shortLink/:cut', async (req,res) =>{

    try {

        const {cut} = req.params;

        const queryDb = {}

        queryDb["link.cut"] = cut;
   

        const link = await Link.findOne(queryDb);
    
        if(!link)
        {
            return res.status(400).send('Short link was not found');
        }
    
        const current_date = new Date;
    
        if(current_date >= link.expiredAt)
        {
            return res.status(400).send('Link was expired');
        }
    
        originalLink = link.link.original;
       
         
    
        res.redirect(originalLink);
      
        
    } catch (error) {
        res.send("Something went wrong");
    }

   


})


module.exports = {router};