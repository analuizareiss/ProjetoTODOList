import React from "react";

const TaskItem = ({
  task,
  onComplete,
  onArchive,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`task ${task.completed ? "completed" : ""} ${task.archived ? "archived" : ""}`}>
      <div className="task-info">
        <span>{task.description}</span>
        <br />
        <small>Data de Término: {new Date(task.end_date).toLocaleDateString()}</small>
      </div>
      <div className="task-actions">
        {!task.completed && (
          <button onClick={() => onComplete(task._id)}>Completar</button>
        )}
        {task.completed && !task.archived && (
          <button onClick={() => onArchive(task._id)}>Arquivar</button>
        )}
        <button onClick={() => onEdit(task)}>Editar</button>
        <button onClick={() => onDelete(task._id)}>Excluir</button>
      </div>
    </div>
  );
};

export default TaskItem;