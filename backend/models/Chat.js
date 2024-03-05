const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  username: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
