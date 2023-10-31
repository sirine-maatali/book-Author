const Cat=require("../models/Catecory")

exports.addCat=(req, res) => {
    const cat = new Cat(req.body);
    cat
      .save()
      .then(() =>
        res.status(201).json({
          model: cat,
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

