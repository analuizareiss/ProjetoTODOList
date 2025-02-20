import React, { useState } from "react";

const TaskForm = ({ onSubmit, initialTask, onCancel }) => {
  const [description, setDescription] = useState(initialTask?.description || "");
  const [end_date, setEndDate] = useState(initialTask?.end_date || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ description, end_date });
    setDescription("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da tarefa"
        required
      />
      <input
        type="date"
        value={end_date}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button type="submit">{initialTask ? "Salvar" : "Adicionar Tarefa"}</button>
      {initialTask && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default TaskForm;