import axios from 'axios';
import React, { useState } from 'react';
import './Task.css';  // Import the CSS file

const Task = ({ list, getList }) => {
    const [newTask, setNewTask] = useState(""); 

    const addNewTask = async () => {
        if (!newTask.trim()) {
            console.log("Task name is required");
            return; 
        }

        try {
            const data = await axios.post("http://localhost:3000/task/create", {
                name: newTask,
                listId: list._id, 
            });

            console.log("Task created:", data.data);
            setNewTask(""); 
            getList(); 
        } catch (err) {
            console.log("Error creating task:", err);
        }
    };

    return (
        <div className="task-container">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)} 
                placeholder="Enter task name"
                className="task-input"
            />
            <button onClick={addNewTask} className="task-button">Add Task</button>
        </div>
    );
};

export default Task;
