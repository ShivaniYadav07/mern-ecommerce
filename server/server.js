const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require("cloudinary")

//Handling uncaught exception
process.on("uncaughtException", (err) =>{
  console.log(`Error: $(err.message)`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
})
dotenv.config({ path: 'server/config/config.env' });

// Connecting to the database
connectDatabase();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

// Start the server and capture the server instance
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled Promise Rejection');

  // Close the server gracefully
  server.close(() => {
    process.exit(1);
  });
});
