import React, { useState, useEffect } from 'react';
import { useCanister } from "@connect2ic/react";

const TodoList = () => {
  const [toDo] = useCanister("toDo");

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshTasks(); 
  }, []);

  const refreshTasks = async () => {
    setLoading(true);
    const result = await toDo.getTasks();
    const objectData = Object.fromEntries(result);
    setTasks(objectData);
    setLoading(false)
    
}

  const addTask = async () => {
    if (newTask.trim() !== '') {
      setLoading(true);
      await toDo.createTask( newTask );
      await refreshTasks();
      setNewTask('');
    }
  };

  const toggleCompleted = async (index) => {
    setLoading(true);
    await toDo.setTask( index );
    await refreshTasks();
  };

  const removeTask = async (index) => {
    setLoading(true);
    await toDo.deleteTask( index );
    await refreshTasks();
  };

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

      {loading && (
        <p className="mx-2 text-center bg-yellow-300 py-2 rounded-md mb-4">
          Cargando...
        </p>
      )}

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
