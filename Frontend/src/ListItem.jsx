import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task";
import "./ListItem.css";

const ListItem = ({ list, getList }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/task/${list._id}`);
      setTasks(response.data);
      console.log("Tasks fetched for list:", response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, [list]);

  const handleDragStart = (e, taskId) => {
    console.log("Dragging task ID:", taskId);
    e.dataTransfer.setData("text/plain", taskId);
    getTasks();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text");
    console.log("Dropped task ID:", taskId);

    try {
      await axios.put(`http://localhost:3000/task/update/${taskId}`, {
        listId: list._id,
      });
      console.log(`Task ${taskId} moved to list ${list._id}`);
      getTasks(); // Refresh tasks in this list
      getList(); // Refresh the parent component's lists
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    console.log("Drag over detected");
    getTasks();
  };

  return (
    <div
      className="list-item"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3>{list.name}</h3>
      <button
        onClick={() => setShowTaskInput(!showTaskInput)}
        className="toggle-task-button"
      >
        {showTaskInput ? "Cancel" : "+ Add Task"}
      </button>
      {showTaskInput && <Task list={list} getList={getList} />}

      <div className="task-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="task-item"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, task._id)}
            >
              <span>{task.name}</span>
            </div>
          ))
        ) : (
          <p>No tasks available for this list.</p>
        )}
      </div>
    </div>
  );
};

export default ListItem;
