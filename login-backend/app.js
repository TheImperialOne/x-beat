const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoURL =
  "mongodb+srv://raj:raj1808@cluster0.ya8o1ie.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(5000, () => {
  console.log("server-started");
});

require("./userDetails");

const User = mongoose.model("BeatUserAuth");

app.post("/auth", async (req, res) => {
  const { username, mail, password } = req.body;
  try {
    const olduser = await User.findOne({ username });
    if (olduser) {
      res.send({ status: "User Exists" });
      console.log("User Exists");
      return;
    }

    await User.create({
      username,
      mail,
      password,
    });
    console.log("user-created");
    res.send({ status: "OK" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/Login-user", async (req, res) => {
  const { mail, password } = req.body;
  const user = await User.findOne({ mail });
  try {
    if (!user) {
      res.send({ error: "User does not Exists" });
      console.log("User does not Exists");
    } else if (password === user.password) {
      res.send({ status: "Login sucess" });
      console.log("Login sucess");
    } else {
      res.send({ status: "Incorrect Password" });
      console.log("Incorrect Password");
    }
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});
