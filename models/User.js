const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    role:{type:String,enum:["admin","user"],default:"user"}
  });
  module.exports = mongoose.model("User", userSchema);