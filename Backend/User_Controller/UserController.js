const Datamodel= require('../User_Model/UserModel')
  const secretKey="hkyniuknkjn"
  const jwt = require("jsonwebtoken");
  const bcrypt = require('bcrypt')
exports.create= async(req,res)=>{
    try {
        const {name,email,password}=req.body
       
        if(!(name && email)){
            return res.status(404).json({msg:"all requires fileds"})
        }
      
        const useremail= await Datamodel.findOne({email:email})
        if( useremail){
          return  res.status(404).json({message:" email already exist"}) 
        }
        const salt = bcrypt.genSaltSync(10);
    const hash= bcrypt.hashSync(password,salt)
    const data={
        name,
        email,
        password:hash
    }

        const newUser =  new Datamodel(data);
      
        await newUser.save();
        
        return res.status(201).json({ msg: "User created successfully" ,newUser});
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", error});
    }
} 
exports.login= async(req,res)=>{
const {email,password}=req.body
const user  = await Datamodel.findOne({email:email})
if(!user){
  return  res.status(404).json({msg:"please sign up first"})
}

const dbPassword = user.password;
  
const matchData = await bcrypt.compare(password, dbPassword);
if (!matchData) {
    return res.status(400).json({ message: "invalid password" });
  }

    const token = jwt.sign({id:user._id},secretKey,
        {expiresIn:'1h'}
     )
console.log(token)
res.status(200).json({ msg: "token" ,token});
}