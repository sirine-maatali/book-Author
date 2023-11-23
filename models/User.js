const mongoose = require("mongoose");

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    role:{type:String,enum:["admin","user"],default:"user"}
  },{
    // Option pour activer les timestamps (createdAt et updatedAt)
    timestamps: true,
  });

  userSchema.plugin(uniqueValidator);

  userSchema.virtual('name').get(function () {
    return this.firstname + ' ' + this.lastname;
});

userSchema.methods.toPublic = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Option pour activer les virtuals lors de la conversion en JSON
userSchema.set('toJSON', { virtuals: true });


userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("User", userSchema);