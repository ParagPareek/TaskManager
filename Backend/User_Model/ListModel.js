const mongoose=require('mongoose')
const list= mongoose.Schema({
    name:{
        type:String,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"NewData"
    }
})
const ListM= mongoose.model("Lists",list)
module.exports=ListM;