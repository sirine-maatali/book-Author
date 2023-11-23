const Book=require("../models/Book")


const AthorBook= (req, res) => {
  const authorId = req.params.id;

  Book.findByAuthor(authorId)
    .populate("author") 
    .populate("categories")
    .then((books) => {
      res.status(200).json({
        books,
        message: "success",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    });
};



const fetchBooks = (req, res) => {
  Book.find()
    .populate("author") 
    .populate("categories")  
    .then((books) =>
      res.status(200).json({
        model: books,
        message: "success",
      })
    )
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "problème d'extraction",
      });
    });
}



const getBookById = (req, res) => {
Book.findOne({ _id: req.params.id })
.populate("author")  // Associer l'auteur au livre
.populate("categories")  // Associer les catégories au livre
.then((book) => {
  if (!book) {
    res.status(404).json({
      message: "Livre non trouvé"
    });
    return;
  }

  res.status(200).json({
    model: book,
    message: "Objet trouvé"
  });
})
.catch((error) => {
  res.status(400).json({
    error: error.message,
    message: "Problème",
  });
});
}


 const addBook=(req, res) => {
    const book = new Book(req.body);
    book
      .save()
      .then(() =>
        res.status(201).json({
          model: book,
          message: "Created!",
        })
      )
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Données invalides",
        });
      });
  }

//modifier
const UpdateBook=(req, res) => {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Book not found ",
          });
          return;
        }
        res.status(200).json({
          model: book,
          message: "Book updated",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "book not correct",
        })
      );
  }


const DeleteBook=(req, res) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => 
      res.status(200).json({ message: "Book  deleted" }))
      
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Id book not correct ",
        });
      });
  }


  const BookByAuthor= (req, res) => {
    const authorId = req.params.id;
      Book.findByAuthor(authorId)
      .populate('author') // Si vous souhaitez également récupérer les détails de l'auteur
      .then((books) => {
        res.status(200).json({ books, message: 'Livres trouvés avec succès' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error, message: 'Erreur serveur' });
      });
  };


 module.exports={
    fetchBooks:fetchBooks,
    addBook:addBook,
    getBookById:getBookById,
    UpdateBook:UpdateBook,
    DeleteBook:DeleteBook,
    AthorBook:AthorBook,
    BookByAuthor:BookByAuthor,
 }