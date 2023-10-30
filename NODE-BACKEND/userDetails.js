const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    username:String,
    mail:String,
    password:String,
  },
  {
    collection: "BeatUserAuth",
  }
);

mongoose.model("BeatUserAuth", UserDetailsSchema);
