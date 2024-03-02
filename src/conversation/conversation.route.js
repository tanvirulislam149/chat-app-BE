const express = require('express');
const { postNewConversationController, getConversationController } = require('./conversation.controller');
const router = express.Router();


router.route("/newConversation").post(postNewConversationController);
router.route("/getConversation/:userId").get(getConversationController)


module.exports = router;
