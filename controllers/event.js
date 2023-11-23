const Event=require("../models/Evenement")


const fetchEvents =(req,res)=>{
    Event.find()
      .then((events) =>
        res.status(200).json({
          model: events,
          message: "success",
        })
      )
  
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "probleme d'extraction",
        });
      });}

  const getEventById=(req,res)=>{
    Event.findOne({_id:req.params.id})
    .then((events) => {
      if(!events){
        res.status(404).json({
          message:"Event non trouve"
        })
        return
      }
  
     res.status(200).json({
      model: events,
      message:"objet trouve"
     })
   })
   .catch((error) => {
   
     res.status(400).json({
       error:error.message,
       message:"probleme ",
     });
   });
  }
  
//  const addEvent= (req, res) => {
//     const Event = new Event(req.body);
//     Event
//       .save()
//       .then(() =>
//         res.status(201).json({
//           model: Event,
//           message: "Created!",
//         })
//       )
//       .catch((error) => {
//         res.status(400).json({
//           error: error.message,
//           message: "Données invalides",
//         });
//       });
//   }

const addEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({
      model: event,
      message: "Created!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Données invalides",
    });
  }
}


//modifier
const UpdateEvent=(req, res) => {
    Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((event) => {
        if (!event) {
          res.status(404).json({
            message: "Event not found ",
          });
          return;
        }
        res.status(200).json({
          model: event,
          message: "Event updated",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "Event not correct",
        })
      );
  }


const DeleteEvent=(req, res) => {
    Event.deleteOne({ _id: req.params.id })
      .then(() => 
      res.status(200).json({ message: "Event deleted" }))
      
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Id Event not correct ",
        });
      });
  }

 module.exports={
    fetchEvents:fetchEvents,
    addEvent:addEvent,
    getEventById:getEventById,
    UpdateEvent:UpdateEvent,
    DeleteEvent:DeleteEvent
 }