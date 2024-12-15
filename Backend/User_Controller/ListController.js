const express=require('express')
const ListModel=require('../User_Model/ListModel')
exports.create1=async(req,res)=>{
    try {
        const {name ,userId}=req.body
        const response= await ListModel.create({name ,user:userId})
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getListsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const lists = await ListModel.find({ user: userId });
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };