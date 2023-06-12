const mongoose = require('mongoose');


const startDB = async (URL) =>{

    await mongoose.connect(URL).then(() =>{
        console.log("Mongo DB links is connected");
    }).catch((err) =>{
        console.log("Something went wrong when you tried connect the server");
    })
}



module.exports = {startDB};