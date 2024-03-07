import React, { useState } from 'react';
import './App.css';
import './Style/style.scss';

function App() {
  const [tasks,setTasks]=useState([]);
  const [newTask,setNewTask]=useState('');
  const [newTaskDescription,setNewTaskDescription]=useState('');
  const [editMode,setEdit]=useState(false);
  const [editIndex,setEditIndex]=useState(null);

  const handleAdd=()=>{
    if(newTask && newTaskDescription){
      if(editMode){
        const updatedTasks=[...tasks];
        updatedTasks[editIndex]={title:newTask,description:newTaskDescription};
        setTasks(updatedTasks);
        setEdit(false);
        setEditIndex(null);
      }
      else{
        setTasks([...tasks,{title:newTask,description:newTaskDescription}]);
      }
      setNewTask('');
      setNewTaskDescription('');
    }
  }

  const editHandle=(index)=>{
    setNewTask(tasks[index].title);
    setNewTaskDescription(tasks[index].description);
    setEdit(true);
    setEditIndex(index);
  }

  const deleteHandle=(index)=>{
    const updatedTasks=[...tasks];
    updatedTasks.splice(index,1);
    setTasks(updatedTasks);
  }

  const cancelHandle=()=>{
    setNewTask('');
    setNewTaskDescription('');
    setEdit(false);
    setEditIndex(null);
  }

  return (
    <div className="app">
      <div className="task-form">
        <input
          type="text"
          placeholder="Tapsiriq adi"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tapsiriq tesviri"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={handleAdd}>{editMode ? 'Yenile' : 'Elave et'}</button>
        {editMode && (
          <>
            <button onClick={cancelHandle}>Legv et</button>
            <button onClick={() => handleAdd()}>Tetbiq et</button>
          </>
        )}
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => editHandle(index)}>Redakte et</button>
              <button onClick={() => deleteHandle(index)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
