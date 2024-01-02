const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()

// CONNECTING TO THE DATABASE (mongoDB)
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database is connected');
    // Start your server only after the database connection is successful
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is connected on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });