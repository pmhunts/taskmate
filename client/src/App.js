import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import Header from './components/Header';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let url = `${API_URL}/tasks`;
        
        if (searchQuery) {
          url = `${API_URL}/tasks/search?query=${encodeURIComponent(searchQuery)}`;
        } else if (selectedCategory) {
          url = `${API_URL}/tasks/category/${encodeURIComponent(selectedCategory)}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [searchQuery, selectedCategory]);

  // Add new task
  const addTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error('Failed to add task');
      
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update task
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) throw new Error('Failed to update task');
      
      const data = await response.json();
      setTasks(tasks.map(task => (task._id === id ? data : task)));
      setIsEditing(false);
      setCurrentTask({});
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete task');
      
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to update task status');
      
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit task (setup for editing)
  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentTask({});
  };

  // Get unique categories
  const categories = [...new Set(tasks.map(task => task.category).filter(Boolean))];

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="sidebar">
          <TaskForm 
            addTask={addTask} 
            updateTask={updateTask}
            isEditing={isEditing}
            currentTask={currentTask}
            cancelEdit={cancelEdit}
          />
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="main-content">
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList 
              tasks={tasks} 
              deleteTask={deleteTask}
              editTask={editTask}
              toggleComplete={toggleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;