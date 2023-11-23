const Joi = require('joi');

// Schéma de validation pour les données de la requête /signup
const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').default('user')
});

// Middleware de validation
const validateSignup = (req, res, next) => {
  const { error, value } = signupSchema.validate(req.body);

  if (error) {
    // S'il y a des erreurs de validation, renvoyez une réponse d'erreur
    return res.status(400).json({
      error: error.details.map((detail) => detail.message),
      message: 'Données invalides'
    });
  }

  // Si la validation réussit, mettez à jour req.body avec les données validées
  req.body = value;

  // Passez au middleware suivant
  next();
};

module.exports = validateSignup;
