const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//Handling uncaught exception
process.on("uncaughtException", (err) =>{
  console.log(`Error: $(err.message)`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
})
dotenv.config({ path: 'server/config/config.env' });

// Connecting to the database
connectDatabase();

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
