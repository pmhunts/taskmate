import React, { useState, useEffect } from 'react';

function TaskForm({ addTask, updateTask, isEditing, currentTask, cancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  useEffect(() => {
    if (isEditing && currentTask) {
      setTitle(currentTask.title || '');
      setDescription(currentTask.description || '');
      setDueDate(currentTask.dueDate ? new Date(currentTask.dueDate).toISOString().split('T')[0] : '');
      setCategory(currentTask.category || '');
    }
  }, [isEditing, currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const taskData = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      category: category || 'Uncategorized',
    };
    
    if (isEditing) {
      updateTask(currentTask._id, taskData);
    } else {
      addTask(taskData);
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategory('');
  };

  return (
    <div className="task-form-container">
      <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>
        
        <div className="form-buttons">
          {isEditing && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="submit-button">
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
