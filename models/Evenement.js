const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    titre:{type:String,required:true},
    datedeb:{type:Date,required:true},
    datefin:{type:Date,required:true}
  });


  module.exports = mongoose.model("Event", eventSchema);