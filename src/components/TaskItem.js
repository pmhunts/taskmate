import React from 'react';

function TaskItem({ task, deleteTask, editTask, toggleComplete }) {
  const formattedDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString() 
    : 'No due date';

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className="task-category">{task.category}</span>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span className="due-date">Due: {formattedDate}</span>
        </div>
      </div>
      
      <div className="task-actions">
        <button 
          className="toggle-button"
          onClick={() => toggleComplete(task._id)}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        
        <button 
          className="edit-button"
          onClick={() => editTask(task)}
        >
          Edit
        </button>
        
        <button 
          className="delete-button"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;