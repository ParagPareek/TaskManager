import axios from "axios";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import "./AddList.css";

const AddList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [Lists, setLists] = useState([]);

  const UserId = localStorage.getItem("userId");

  const getList = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/list/${UserId}`);
      setLists(response.data);
      console.log("Fetched lists:", response.data);
    } catch (err) {
      console.error("Error fetching lists:", err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleAddList = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/list/create", {
        name: username,
        userId: UserId,
      });
      setUsername(""); // Reset input field
      setIsAddModalOpen(false); // Close the modal
      getList(); // Refresh the lists
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <>
      <div className="list-container">
        {Lists.map((list) => (
          <ListItem key={list._id} list={list} getList={getList} />
        ))}
        <div className="list-item">
          <div>Add List</div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="add-button"
          >
            +
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsAddModalOpen(false)}
            >
              &times;
            </span>
            <h3>Add New List</h3>

            <form onSubmit={handleAddList}>
              <div className="form-group">
                <label>
                  Name:
                  <input
                    placeholder="Enter list name"
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </div>

              <button type="submit" className="submit-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddList;
