const express=require("express")

const router =express.Router()

const AuthorController=require("../controllers/author")

  router.post("/",AuthorController.addAuthor)
   
    module.exports=router
