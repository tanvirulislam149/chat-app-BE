const messageModel = require("./message.model");


const postMessageController = async (req, res) => {
  try {
    const data = req.body;
    const message = await messageModel.create(data);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
}

const getMessageController = async (req, res) => {
  try {
    const message = await messageModel.find({ conversationId: req.params.conversationId });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
}



module.exports = { postMessageController, getMessageController }