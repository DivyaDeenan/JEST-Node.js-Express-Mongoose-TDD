const mongoose = require("mongoose");

async function connect(){
    try{
     await mongoose.connect("mongodb+srv://divya123:orange@123@divyad-cluster-r0kf3.mongodb.net/TODO-DB-JEST?retryWrites=true&w=majority",{

      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected");
    }
    catch(err){
        console.error("Error connecting to mongoose");
        console.error(err);
    }
}

module.exports = { connect };