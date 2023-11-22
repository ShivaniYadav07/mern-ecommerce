const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')



dotenv.config({path:'server/config/config.env'})

//connecting to db

connectDatabase()
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
