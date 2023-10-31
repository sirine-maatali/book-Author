
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    title: { type: String, enum:["Horror","Mystery","Drame","Aventure","policier","humour"] },
   
  });
  module.exports = mongoose.model("Category", categorySchema);