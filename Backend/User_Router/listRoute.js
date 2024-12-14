const express=require('express')
const { create1, getListsByUser } = require('../User_Controller/ListController')

const Router1= express.Router()
Router1.post('/create',create1)
Router1.get("/:userId", getListsByUser);
module.exports=Router1