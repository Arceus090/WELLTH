const Message = require('../models/Chat');
const chatController = require('express').Router()

chatController.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
  });
  
  chatController.post('/messages', async (req, res) => {
    const { text, username } = req.body;
    const message = new Message({ text, username });
    await message.save();
    res.json(message);
  });


  module.exports = chatController