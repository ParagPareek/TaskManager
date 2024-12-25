const express=require('express')
const { create1, getListsByUser, updatecolor } = require('../User_Controller/ListController')

const Router1= express.Router()
Router1.post('/create',create1)
Router1.get("/:userId", getListsByUser);
Router1.put("/updatecolor",updatecolor)
module.exports=Router1