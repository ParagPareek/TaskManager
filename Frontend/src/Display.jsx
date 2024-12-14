import React, { useState, useEffect } from 'react';
import './Display.css';
import axios from 'axios';

const Display = () => {
  const [addInput, setAddInput] = useState(false);
  const [listName, setListName] = useState(''); // State for list name
  const [lists, setLists] = useState([]); // State for fetched lists

  // Function to fetch user-specific lists
  const getApi = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    if (!userId) {
      console.error('User ID not found.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/list/${userId}`);
      setLists(response.data); // Update state with fetched lists
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  // Call getApi on component mount
  useEffect(() => {
    getApi();
  }, []);

  // Function to create a new list
  const handleSave = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    if (!userId || !listName) {
      alert('User ID or List Name is missing.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/list/create', {
        name: listName,
        userId: userId,
      });
      alert("list has been created")
      console.log('List created successfully:', response.data);

      // Clear input, close input field, and fetch updated lists
      setListName('');
      setAddInput(false);
      getApi(); // Refresh lists after adding a new one
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <>
      <button className="AddList" onClick={() => setAddInput(true)}>
        Add List
      </button>

      {addInput && (
        <div>
          <input
            placeholder="Add List Name"
            value={listName}
            onChange={(e) => setListName(e.target.value)} // Update list name state
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}

      <h3>Your Lists:</h3>
      {lists.length > 0 ? (
        <ul>
          {lists.map((list) => (
            <li key={list.id}>{list.name}</li>
            
          ))}
        </ul>
      ) : (
        <p>No lists found.</p>
      )}
    </>
  );
};

export default Display;
