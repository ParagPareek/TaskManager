import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Display.css";

const Display = () => {
  const [lists, setLists] = useState([]); // State to hold all lists
  const [listName, setListName] = useState(""); // New list name
  const [taskName, setTaskName] = useState(""); // New task name
  const [activeListId, setActiveListId] = useState(null); // Active list ID for task input
  const [isAddingList, setIsAddingList] = useState(false); // Toggle for list creation

  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

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

  // Fetch tasks for a specific list
  const fetchTasks = async (listID) => {
    try {
      const response = await axios.get(`http://localhost:8080/task/${listID}`);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listID ? { ...list, tasks: response.data } : list
        )
      );
    } catch (error) {
      console.error(`Error fetching tasks for list ${listID}:`, error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []); // Fetch lists when component mounts

  useEffect(() => {
    if (lists.length > 0) {
      lists.forEach((list) => {
        fetchTasks(list._id); // Fetch tasks for each list after lists are fetched
      });
    }
  }, [lists]); // Fetch tasks only when lists change

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

  // Add a new task to a specific list
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
      {lists.length > 0 ? (
        <div className="lists-wrapper">
          {lists.map((list) => (
            <div key={list._id} className="list-item">
              <h4>{list.name}</h4>
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
      ) : (
        <p>No lists found.</p>
      )}
    </div>
  );
};

export default Display;
