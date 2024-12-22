import React, { useState } from 'react';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (indexToRemove) => {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h1>Tasks (edit)</h1>
      <div>
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Introduce a new task"
        />
        <button 
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <table className="table">
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task}</td>
              <td className="done-cell">
                <button onClick={() => removeTask(index)}>
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;