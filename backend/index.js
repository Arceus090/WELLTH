const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const commentController = require('./controllers/commentController')
const uploadController = require('./controllers/uploadController')
const chatController = require('./controllers/chatController');
const verifyToken = require('./middleware/verifyToken'); 
const articleController = require('./controllers/articleController'); 

// CONNECTING TO THE DATABASE (mongoDB)
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database is connected');
    // Start your server only after the database connection is successful
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server is connected on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


app.use('/images', express.static('public/images'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/user', userController)
app.use('/chat', chatController)
app.use('/post',verifyToken, postController)
app.use('/comment',verifyToken, commentController)
app.use('/upload', uploadController)
app.use('/article', verifyToken, articleController);

