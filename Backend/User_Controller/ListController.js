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
  exports.updatecolor =async(req,res)=>{
    const{listID,color}=req.body ;
    try {
      const updatedList = await ListModel.findByIdAndUpdate(
        listID, 
        { color }, 
        { new: true } // Return the updated list after the operation
      );
      if (!updatedList) {
        return res.status(404).json({ error: "List not found" });
      }
      res.status(200).json(updatedList); // Return the updated list
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }