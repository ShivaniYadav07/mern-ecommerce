const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");

// Load environment variables
const result = dotenv.config({ path: "./config/config.env" });

if (result.error) {
  console.error("Error loading environment variables:", result.error);
}

console.log("All environment variables:", process.env);

// Connect to the database
connectDatabase();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
