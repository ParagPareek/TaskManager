const express=require('express')
const mongoose= require('mongoose')
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
exports.getTasksForList = async (req, res) => {
    const { listID} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(listID)) {
            return res.status(400).json({ error: "Invalid listId" });
        }

        const tasks = await TaskModel.find({ listID });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: "No tasks found for this list" });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks." });
    }
};
exports.updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { listID } = req.body;
  
    console.log("jh");
    try {
        
      const task = await TaskModel.findById(taskId);
      task.listID = listID; 
      await task.save();
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  