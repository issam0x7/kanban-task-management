const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         dbName: "kaban-tasks-db",
      });
   } catch (err) {
      console.log(err);
   }
};

module.exports = connectDB;
