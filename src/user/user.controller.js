const { ObjectId } = require("mongodb");
const userModel = require("./user.model");

const getUserController = async (req, res) => {
  try {
    const { name } = req.body;
    const nameResult = await userModel.findOne({ name: name }).select({ password: 0 });
    // const nameResult = await userModel.findOne({ name: name }, { projection: { password: 1 } });
    const passwordResult = await userModel.findOne(req.body);
    if (nameResult && passwordResult) {
      res.status(200).json(nameResult);
    } else if (nameResult) {
      res.status(401).json("password didn't match");
    } else {
      res.status(403).json("user not found")
    }
  } catch (error) {
    console.log(error);
  }
}

const addUserController = async (req, res) => {
  try {
    const user = req.body;
    const result = await userModel.insertOne(user);
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
}

const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find({}).select({ password: 0 });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}


const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findOne({ _id: new ObjectId(userId) }).select({ password: 0 });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUserController, addUserController, getAllUser, getUserInfo }