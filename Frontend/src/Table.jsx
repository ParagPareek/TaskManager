import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Table.css"; 

const Table = () => {
  const [taskItem, setTaskItem] = useState([]);
  const userId = localStorage.getItem("userId");

 
  const getAllTask = async () => {
    try {
      const response = await axios.get(
       `http://localhost:8080/task/allTask/${userId}`,
        
      );
      setTaskItem(response.data);
      console.log("moooooooooooooooooooooooooooo",response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

 useEffect(()=>{
  getAllTask()
 },[])

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>List</th>
              <th>Labels</th>
              <th>Due date</th>
            </tr>
          </thead>
          <tbody>
            {taskItem.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.listname}</td>
                <td>{item.lable}</td>
                {/* Uncomment this section when labels and list are available */}
                {/* <td>{item.list}</td>
                <td>
                  <div className="flex space-x-2">
                    {item.labels.map((label, i) => (
                      <span
                        key={i}
                        className={label ${getLabelColor(label)}}
                      ></span>
                    ))}
                  </div>
                </td>
                <td>{item.dueDate}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;