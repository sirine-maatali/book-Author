const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const authorSchema = mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    nationality:{type:String,required:true}
  });

  authorSchema.plugin(uniqueValidator);

  module.exports = mongoose.model("Author", authorSchema);