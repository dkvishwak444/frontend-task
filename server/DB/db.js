const mongoose = require('mongoose');
const dontenv = require("dotenv");
dontenv.config();
const uri = process.env.uri;

const connectdb = async () => {
    try{
     await mongoose.connect(uri);
     console.log("database connected successsfully");
    }
    catch(error)
    {
        console.log(`databse error while connection`,error.message);
        
    }
     
}

module.exports = connectdb;