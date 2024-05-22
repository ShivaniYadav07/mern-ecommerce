const mongoose = require("mongoose");

const connectDatabase = () => {
  const uri = process.env.DB_URI;
  if (!uri) {
    console.error("DB_URI is not defined");
    process.exit(1);
  }

  mongoose
    .connect(uri)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
      process.exit(1);
    });
};

module.exports = connectDatabase;
