const express=require("express")
const router =express.Router()
const userController = require("../controllers/user")
const validateSignup = require('../middlewares/validateSignup');

  router.post("/signup",userController.signup)
  router.post("/login",userController.login)
  router.post("/signupe",validateSignup,userController.Signupe)   

 module.exports=router
