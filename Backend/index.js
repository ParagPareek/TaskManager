require("dotenv").config()
const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const con= express();
const UserRoute= require('../Backend/User_Router/UserRouter')
const listRoute= require('../Backend/User_Router/listRoute')
const taskRoute=require('../Backend/User_Router/TaskRoute')
con.use(cors());
con.use(express.json())
con.use(express.urlencoded({extended:true}))
con.use('/new',UserRoute)
con.use('/list',listRoute)
con.use('/task',taskRoute)
const port=process.env.PORT || 8989;
console.log(process.env.mongourl)
 mongoose.connect(process.env.mongourl)
 .then(()=>{
    console.log('yes')
}).catch((err)=>{
    console.log(`no`,err);
})
con. listen(port,()=>{
    console.log(`${port}`)
})