import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Display.css";

const Display = () => {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [activeListId, setActiveListId] = useState(null);
  const [isAddingList, setIsAddingList] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch all lists for the user
  const fetchLists = async () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/list/${userId}`);
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  // Fetch tasks for each list
  const fetchTasks = async (listID) => {
    try {
      const response = await axios.get(`http://localhost:8080/task/${listID}`);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listID ? { ...list, tasks: response.data } : list
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    if (lists.length > 0) {
      lists.forEach((list) => {
        fetchTasks(list._id);
      });
    }
  }, [lists]);

  // Add a new list
  const addList = async () => {
    if (!listName.trim()) {
      alert("List name cannot be empty.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/list/create", {
        name: listName,
        userId,
      });
      setListName("");
      setIsAddingList(false);
      fetchLists();
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  // Add a new task
  const addTask = async (listID) => {
    if (!taskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/task/create", {
        name: taskName,
        listID,
      });
      setTaskName("");
      setActiveListId(null);
      fetchTasks(listID);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle list color update
  const updateListColor = async (listID, newColor) => {
    // Update color in the local state first for immediate feedback
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listID ? { ...list, color: newColor } : list
      )
    );

    // Send color update to the server
    try {
      await axios.put("http://localhost:8080/list/updatecolor", {
        listID,
        color: newColor,
      });
      console.log("Color updated on the server");
    } catch (error) {
      console.error("Error updating color:", error.response?.data || error.message);
      // Revert color change if error occurs
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listID ? { ...list, color: list.color } : list
        )
      );
    }
  };

  return (
    <div className="display-container">
      <button className="add-list-button" onClick={() => setIsAddingList(true)}>
        Add List
      </button>

      {isAddingList && (
        <div className="add-list-container">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
          />
          <button onClick={addList}>Save</button>
          <button onClick={() => setIsAddingList(false)}>Cancel</button>
        </div>
      )}

      <h3>Your Lists:</h3>
      <div className="lists-wrapper">
        {lists.map((list) => (
          <div key={list._id} className="list-item" style={{ backgroundColor: list.color }}>
            <h4>{list.name}</h4>

            <label>Change Color:</label>
            <input
              type="color"
              value={list.color || "#FFFFFF"}  // Default to white if no color
              onChange={(e) => updateListColor(list._id, e.target.value)}
            />

            <button
              onClick={() => {
                if (activeListId === list._id) {
                  setActiveListId(null);
                } else {
                  setActiveListId(list._id);
                }
              }}
            >
              {activeListId === list._id ? "Cancel" : "Add Task"}
            </button>

            {activeListId === list._id && (
              <div className="task-input-container">
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Enter task name"
                />
                <button onClick={() => addTask(list._id)}>Save Task</button>
              </div>
            )}

            <div className="tasks-container">
              {list.tasks && list.tasks.length > 0 ? (
                list.tasks.map((task) => (
                  <div key={task._id} className="task-item">
                    {task.name}
                  </div>
                ))
              ) : (
                <p>No tasks for this list.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
