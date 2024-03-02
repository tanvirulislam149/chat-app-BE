const conversationModel = require("./conversation.model");

const postNewConversationController = async (req, res) => {
  try {
    const newConversation = {
      members: [req.body.senderId, req.body.receiverId]
    }
    const exists = await conversationModel.findOne({ $and: [{ members: { $in: [newConversation.members[0]] } }, { members: { $in: [newConversation.members[1]] } }] });
    if (!exists) {
      const result = await conversationModel.create(newConversation)
      console.log(result);
      res.status(200).json(result)
    }
    else {
      res.status(200).json({ data: "conversation Exists" })
    }
  } catch (error) {
    console.log(error);
  }
}

const getConversationController = async (req, res) => {
  try {
    const query = { members: { $in: [req.params.userId] } };
    const conversation = await conversationModel.find(query);
    res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
  }
}






module.exports = { postNewConversationController, getConversationController }