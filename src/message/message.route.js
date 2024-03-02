const express = require('express');
const { postMessageController, getMessageController } = require('./message.controller');
const router = express.Router();

router.route("/addMessage").post(postMessageController);
router.route("/getMessage/:conversationId").get(getMessageController);


module.exports = router;