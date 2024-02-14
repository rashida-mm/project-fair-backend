const mongoose = require('mongoose');

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'projectfair' // Specify the database name here
}).then(() => {
  console.log("mongodb connection established...");
}).catch((error) => {
  console.log("mongodb connection error !");
});
