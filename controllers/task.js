const Task=require("../models/Task")


const fetchTasks =(req,res)=>{
    Task.find()
      .then((tasks) =>
        res.status(200).json({
          model: tasks,
          message: "success",
        })
      )
  
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "probleme d'extraction",
        });
      });}

  const getTaskById=(req,res)=>{
    Task.findOne({_id:req.params.id})
    .then((tasks) => {
      if(!tasks){
        res.status(404).json({
          message:"task non trouve"
        })
        return
      }
  
     res.status(200).json({
      model: tasks,
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
  
//  const addTask= (req, res) => {
//     const task = new Task(req.body);
//     task
//       .save()
//       .then(() =>
//         res.status(201).json({
//           model: task,
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

const addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({
      model: task,
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
const UpdateTask=(req, res) => {
    Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((task) => {
        if (!task) {
          res.status(404).json({
            message: "Task not found ",
          });
          return;
        }
        res.status(200).json({
          model: task,
          message: "Task updated",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "Task not correct",
        })
      );
  }


const DeleteTask=(req, res) => {
    Task.deleteOne({ _id: req.params.id })
      .then(() => 
      res.status(200).json({ message: "Task deleted" }))
      
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Id Task not correct ",
        });
      });
  }

 module.exports={
    fetchTasks:fetchTasks,
    addTask:addTask,
    getTaskById:getTaskById,
    UpdateTask:UpdateTask,
    DeleteTask:DeleteTask
 }