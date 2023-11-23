const express = require ("express")
const app= express()
const taskRoutes=require("./routes/task")
const bookRoutes=require("./routes/book")
const userRoutes=require("./routes/user")
const catRoutes=require("./routes/category")
const AuthorRoutes=require("./routes/author")
const eventRoutes=require("./routes/event")
const mongoose = require('mongoose')

mongoose
.connect("mongodb://localhost:27017/database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

  app.use(express.json())

app.use("/api/author",AuthorRoutes)  
app.use("/api/cats",catRoutes)  
app.use("/api/tasks",taskRoutes)
app.use("/api/books",bookRoutes)
app.use("/api/user",userRoutes)
app.use("/api/event",eventRoutes)
module.exports=app