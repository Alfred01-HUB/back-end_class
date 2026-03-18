const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URI).then(() => {
  
    console.log("Data base connected successfully");
}).catch((err) => {
    console.log(`error:${err}`);
});