import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, initialTask, onCancel }) => {
  const [description, setDescription] = useState("");
  const [end_date, setEndDate] = useState("");
  const [id, setId] = useState("");

  const formatDate = (date) => {
    if (!date) return ""; 
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); 
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(initialTask){
      onSubmit({_id: id,description, end_date});
    }
    else
      onSubmit({ description, end_date });
    setDescription("");
    setEndDate("");
  };

  useEffect(() => {
    if(initialTask) {
      setId(initialTask._id);
      setDescription(initialTask.description);
      setEndDate(formatDate(initialTask.end_date))
    }
    else{
      setDescription("");
      setEndDate("");
    }
  }, [initialTask]);

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