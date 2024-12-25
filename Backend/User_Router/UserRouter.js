const express =require('express');
const { create, login, forgetpassword1 ,} = require('../User_Controller/UserController');


const router=express.Router();
 
router.post('/enter',create)
router.post('/login',login)
router.post("/forgetpassword",forgetpassword1);
module.exports=router