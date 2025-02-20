import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onComplete, onArchive, onEdit, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onArchive={onArchive}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;