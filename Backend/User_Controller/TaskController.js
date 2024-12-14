const express=require('express')
const TaskModel=require('../User_Model/Task_Model')
const listModel=require('../User_Model/ListModel')

exports.createTask=async(req,res)=>{
    const { name, listID } = req.body;
    try {

      const list = await listModel.findById(listID);
      if (!list) {
        return res.status(404).json({ error: "List not found" });
      }

      const task = await TaskModel.create({ name, listID });
      res.status(200).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: error.message });
    }
}