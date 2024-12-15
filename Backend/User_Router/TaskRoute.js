const express=require('express')
const { createTask ,getTasksForList,updateTask} = require('../User_Controller/TaskController')
const Router2= express.Router()
Router2.post('/create',createTask)
Router2.get("/:listID", getTasksForList);
Router2.put("/update/:taskId", updateTask);
module.exports=Router2