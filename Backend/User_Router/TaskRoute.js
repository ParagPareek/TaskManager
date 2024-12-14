const express=require('express')
const { createTask } = require('../User_Controller/TaskController')
const Router2= express.Router()
Router2.post('/create',createTask)
module.exports=Router2