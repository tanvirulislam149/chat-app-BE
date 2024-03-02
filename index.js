const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 5000;
const userRouter = require("./src/user/user.route")
const conversationRouter = require("./src/conversation/conversation.route")
const messageRouter = require("./src/message/message.route")

const http = require('http').Server(app);
const cors = require('cors');
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aqyi5ql.mongodb.net/chat-app?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  console.log("db connected");
}

main();

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});



let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const customIO = io.of("/chat");

customIO.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("addUser", ({ userId, check }) => {
    console.log(check);
    addUser(userId, socket.id);
    customIO.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text, room }) => {
    const user = getUser(receiverId);
    console.log(user, text, room);
    customIO.to(room).emit("message", {
      user,
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    customIO.emit("getUsers", users);
  });
});


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


app.use("/user", userRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);