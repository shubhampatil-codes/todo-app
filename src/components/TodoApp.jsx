import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return alert("Task cannot be empty.");
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'completed' ? task.completed :
    filter === 'active' ? !task.completed : true
  );

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === 'newest' ? b.id - a.id : a.id - b.id
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new task"
          className="flex-1 border p-2 rounded"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      <div className="flex justify-between mb-4">
        <select onChange={(e) => setFilter(e.target.value)} value={filter} className="border p-1 rounded">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} className="border p-1 rounded">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <ul>
        {sortedTasks.map(t => (
          <li key={t.id} className="flex justify-between items-center mb-2 border-b pb-1">
            <span
              onClick={() => toggleComplete(t.id)}
              className={`flex-1 cursor-pointer ${t.completed ? 'line-through text-gray-500' : ''}`}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTask(t.id)} className="text-red-500">🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;