const mongoose = require("mongoose");
const Joi = require('joi');

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  });


// Validation Joi pour la création d'événement
eventSchema.statics.joiValidation = function (event) {
    const schema = Joi.object({
      title: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required().greater(Joi.ref('startDate'))
    });
  
    return schema.validate(event);
  };
  
  module.exports = mongoose.model("Event", eventSchema);