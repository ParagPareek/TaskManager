require("dotenv").config()
const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const con= express();
const UserRoute= require('../Backend/User_Router/UserRouter')
con.use(cors());
con.use(express.json())
con.use(express.urlencoded({extended:true}))
con.use('/new',UserRoute)
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