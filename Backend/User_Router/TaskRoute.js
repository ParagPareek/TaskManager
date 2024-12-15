const express=require('express')
const { createTask ,getTasksForList} = require('../User_Controller/TaskController')
const Router2= express.Router()
Router2.post('/create',createTask)
Router2.get("/:listID", getTasksForList);
module.exports=Router2