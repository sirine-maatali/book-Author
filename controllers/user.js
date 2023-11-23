const jwt=require ("jsonwebtoken")
const bcrypt = require ("bcrypt")
const User =require("../models/User")
const { response } = require("../app")

exports.signup=(req,res,next)=>{
bcrypt
.hash(req.body.password,10)
.then((hash)=>{
    const user =new User({
        email:req.body.email,
        password:hash,
        lastname:req.body.lastname,
        firstname:req.body.firstname,
        role:req.body.role,
    })
    user
    .save()
    .then((response)=>{
        const newUser=response.toObject()
        delete newUser.password
        res.status(201).json({
            model:newUser,
            message:"utilisateur cree ",
        })
    })
    .catch((error)=>res.status(400).json({
        error:error,
        message:"email deja existé"
    }))
    .catch((error)=>res.status(500).json({error}))
})
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Login ou mot de passe incorrect" });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: "Login ou mot de passe incorrect" });
                    }
                    res.status(200).json({
                        token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                            expiresIn: "24h"
                        }),
                    });
                })
                .catch((error) => {
                    res.status(500).json({ error: error });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}




exports.Signupe = (req, res, next) => {
    // Utiliser bcrypt pour hasher le mot de passe
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        const newUser = new User({
          email: req.body.email,
          password: hash,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          role: req.body.role,
        });
  
        newUser.save()
          .then((savedUser) => {
            // Utiliser la méthode toPublic pour créer un objet public de l'utilisateur
            const publicUser = savedUser.toPublic();
  
            // Supprimer le mot de passe du résultat
            delete publicUser.password;
  
            res.status(201).json({ user: publicUser, message: 'Utilisateur créé avec succès' });
          })
          .catch((error) => {
            console.error(error);
            res.status(400).json({ message: 'Erreur lors de la création de utilisateur', error: error.message });
          });
      })
      .catch((error) => res.status(500).json({ error }));
  };