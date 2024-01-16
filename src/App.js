import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };
  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };
  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };
  return (
    <div className="font-bold text-center">
      <h1 className="text-2xl m-4">CRUD Operations</h1>
      <div className="flex gap-4 justify-center items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 py focus:outline-none focus:border-blue-500"
          placeholder="Enter text"
        />
        <button
          className="border border-gray-300 rounded-md p-2 py focus:outline-none focus:border-blue-500 bg-blue-500 text-white"
          onClick={updateId ? updateTask : addTask}
        >
          {updateId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
