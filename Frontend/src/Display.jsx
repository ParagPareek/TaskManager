import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./Display.css";

const Display = () => {
  const [lists, setLists] = useState([]); 
  const [listName, setListName] = useState(""); 
  const [taskName, setTaskName] = useState("");
  const [activeListId, setActiveListId] = useState(null); 
  const [isAddingList, setIsAddingList] = useState(false); 

  const userId = localStorage.getItem("userId"); 

  
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
  }, []); 

  useEffect(() => {
    if (lists.length > 0) {
      lists.forEach((list) => {
        fetchTasks(list._id); 
      });
    }
  }, [lists]); 

 
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

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return; 
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

  
    const sourceListIndex = lists.findIndex((list) => list._id === source.droppableId);
    const destinationListIndex = lists.findIndex((list) => list._id === destination.droppableId);

    if (sourceListIndex < 0 || destinationListIndex < 0) return;

   
    const sourceList = lists[sourceListIndex];
    const destinationList = lists[destinationListIndex];
    const [movedTask] = sourceList.tasks.splice(source.index, 1);
    destinationList.tasks.splice(destination.index, 0, movedTask);

    setLists([...lists]);

    
    try {
      await axios.put(`http://localhost:8080/task/update/${draggableId}`, {
        listID: destination.droppableId,
      });
    } catch (error) {
      console.error("Error moving task:", error);
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
      <DragDropContext onDragEnd={onDragEnd}>
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

              <Droppable droppableId={list._id}>
                {(provided) => (
                  <div
                    className="tasks-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {list.tasks && list.tasks.length > 0 ? (
                      list.tasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              className="task-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {task.name}
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p>No tasks for this list.</p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Display;
