import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, editTask, toggleComplete }) {
  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks found. Create a new task to get started!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;