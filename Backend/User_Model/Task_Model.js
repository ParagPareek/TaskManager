const mongoose= require('mongoose')
const form2=mongoose.Schema({
    name:{
        type:String
    },
    listID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lists",
        required:true,
    }
})
const task1=mongoose.model("Task",form2)
module.exports= task1;