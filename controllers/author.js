const Author=require("../models/author")

exports.addAuthor=(req, res) => {
    const author = new Author(req.body);
    author
      .save()
      .then(() =>
        res.status(201).json({
          model: author,
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

