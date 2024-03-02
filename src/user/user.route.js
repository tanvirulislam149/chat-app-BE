const express = require('express');
const router = express.Router();
const { getUserController, addUserController, getAllUser, getUserInfo } = require('./user.controller');


router.route("/getUser").post(getUserController)
router.route("/addUser").post(addUserController)
router.route("/getAllUser").get(getAllUser)
router.route("/getUser/:userId").get(getUserInfo)



module.exports = router;