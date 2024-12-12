const express =require('express');
const { create, login } = require('../User_Controller/UserController');
const router=express.Router();
 
router.post('/enter',create)
router.post('/login',login)
module.exports=router