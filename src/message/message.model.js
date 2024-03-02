const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  senderId: { type: String, required: true },
  conversationId: { type: String, required: true },
  text: { type: String, required: true }
})

const messageModel = new mongoose.model("message", messageSchema);

module.exports = messageModel;