const express=require('express')
const { createTask ,getTasksForList,updateTask, getAllTasks} = require('../User_Controller/TaskController')
const Router2= express.Router()
Router2.post('/create',createTask)
Router2.get("/:listID", getTasksForList);
Router2.put("/update/:taskId", updateTask);
Router2.get("/allTask/:userId", getAllTasks);
module.exports=Router2