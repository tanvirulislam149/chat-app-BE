const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  members: [String, String]
}, { timestamps: true })

const conversationModel = new mongoose.model("conversation", conversationSchema);


module.exports = conversationModel;