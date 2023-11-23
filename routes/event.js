const express=require("express")

const router =express.Router()

const eventController=require("../controllers/event")


router.get("/",eventController.fetchEvents)
  
router.get("/:id",eventController.getEventById)
  
  
router.post("/",eventController.addEvent)

router.patch("/:id",eventController.UpdateEvent)


router.delete("/:id",eventController.DeleteEvent)

module.exports=router
