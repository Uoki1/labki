const mongoose = require('mongoose')


module.exports = async (url) =>{
    await mongoose.connect(url).then(() =>{
        console.log("Mongo db is connected");
    }).catch((err) =>{
        console.log(err);
        console.log("smth went wrong");
    })
}