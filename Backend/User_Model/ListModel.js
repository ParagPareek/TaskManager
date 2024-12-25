const mongoose=require('mongoose')
const list= mongoose.Schema({
    name:{
        type:String,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"NewData"
    },
    color:{
        type: String,
        default: '#f9f9f9',

    }
})
const ListM= mongoose.model("Lists",list)
module.exports=ListM;