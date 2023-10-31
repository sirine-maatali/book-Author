const express=require("express")

const router =express.Router()

const catController=require("../controllers/category")

  router.post("/",catController.addCat)
   
    module.exports=router
