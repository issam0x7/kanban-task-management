const mongoose = require("mongoose");
const config = require("./config");

const dataBaseConnection = async () => {
   try {
      await mongoose.connect(config.mongoose.url, {
         dbName: "kaban-tasks-db",
      });
   } catch (err) {
      console.log(err);
   }
};

// mongoose.connection.on('connected', () => {
//    console.log('Connected to MongoDB');
//    server.listen(port);
//    server.on('error', onError);
//    server.on('listening', onListening);
//  })
 
 mongoose.connection.on('error', (err) => {
   console.log(err);
 })

module.exports = dataBaseConnection;
