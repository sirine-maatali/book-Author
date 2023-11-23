const express=require("express")

const router =express.Router()

const bookController=require("../controllers/book")

router.get("/",bookController.fetchBooks)
  
  router.get("/:id",bookController.getBookById)
  
  
  router.post("/",bookController.addBook)
   

//modifier
router.patch("/:id",bookController.UpdateBook)


router.delete("/:id",bookController.DeleteBook)

router.get("/book/author/:id",bookController.AthorBook)

router.get("/books/author/:id",bookController.BookByAuthor)

module.exports=router
