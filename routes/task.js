const express=require("express")

const router =express.Router()

const taskController=require("../controllers/task")

const auth=require ("../middlewares/auth")


  router.get("/",auth.loggedMiddleware,taskController.fetchTasks)
  
  router.get("/:id",taskController.getTaskById)
  
  
  router.post("/",taskController.addTask)

router.patch("/:id",auth.loggedMiddleware,auth.isAdmin,taskController.UpdateTask)


router.delete("/:id",taskController.DeleteTask)

    module.exports=router
