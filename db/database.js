const mongoose = require("mongoose");

async function dbServer(){
    await mongoose.connect("mongodb://localhost:27017/contact");
    console.log("connected successfully with database");
}

module.exports = dbServer;