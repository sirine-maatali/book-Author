const mongoose = require("mongoose");

const{Schema} = mongoose;

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref:'Author' },
  publYear: { type: Date, required: true },
  description: { type: String, required: true },
  nbPages: { type: Number, required: false },
  language: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  genres: [{ type: String, required: false }],
  keywords: [{ type: String, required: false }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }] // Utilisez le bon nom de modèle 'Category'
});
module.exports = mongoose.model("Book", bookSchema);