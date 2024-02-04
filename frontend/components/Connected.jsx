import React, { useState, useEffect } from 'react';
import { useCanister } from "@connect2ic/react";

const TodoList = () => {
  const [toDo] = useCanister("toDo");

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    refreshTasks(); 
  }, []);

  const refreshTasks = async () => {
    const result = await toDo.getTasks();
    const objectData = Object.fromEntries(result);
    console.log(objectData)
    setTasks(objectData);
    
}

  const addTask = async () => {
    if (newTask.trim() !== '') {
      await toDo.createTask( newTask );
      await refreshTasks();
      setNewTask('');
    }
  };

  const toggleCompleted = async (index) => {
    await toDo.setTask( index );
    await refreshTasks();
  };

  // const removeTask = (index) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks.splice(index, 1);
  //   setTasks(updatedTasks);
  // };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 border p-2 mr-2"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={addTask}
        >
          Agregar
        </button>
      </div>

      <ul>
      {Object.entries(tasks).map(([key, task]) => (
        <li key={key} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={task.done}
            onChange={() => toggleCompleted(key)}
          />
          <span
            className={task.done ? 'line-through' : ''}
            style={{ flex: 1 }}
          >
            {task.task}
          </span>
          <button
            className="bg-red-500 text-white p-1"
            onClick={() => removeTask(key)}
          >
            Eliminar
          </button>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default TodoList;
