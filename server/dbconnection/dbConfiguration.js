const mongoose = require("mongoose");

const dbConnected = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);
        console.log("db connected");
    } catch (error) {
         console.log("db not connected", error);
    }

}
module.exports = dbConnected;