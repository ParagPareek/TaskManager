const mongoose = require('mongoose');
const form1=mongoose.Schema({
name:{
    type:String,
    required:true
}
,
email:{
    type:String,
    required:true
}
,
password:{
    type:String,
    required:true
}

})
const todolist  =mongoose.model('NewData',form1);
module.exports= todolist;