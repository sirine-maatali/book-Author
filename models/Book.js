const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');

const{Schema} = mongoose;

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  // author: { type: Schema.Types.ObjectId, ref:'Author' },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
    validate: {
      validator: async function (authorId) {
        const author = await mongoose.model('Author').findById(authorId);
        return author && author.books.length > 0;
      },
      message: 'L\'auteur doit avoir écrit d\'autres livres avant.'
    }
  },

  publYear: { type: Date, required: true },
  description: { type: String, required: true },
  nbPages: { type: Number, required: false },
  language: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  genres: [{ type: String, required: false }],
   categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }] }
   ,{
    timestamps: true,
  });

  bookSchema.plugin(idValidator);

// Méthode statique pour trouver tous les livres avec le même auteur

bookSchema.statics.findByAuthor = function (authorId) {
  return this.find({ author: authorId }).populate('author');
};




module.exports = mongoose.model("Book", bookSchema);