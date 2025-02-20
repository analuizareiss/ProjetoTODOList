import React, { useState } from "react";

const TaskSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); 

  // Função para lidar com a mudança no campo de pesquisa
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="task-search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Pesquisar tarefas..."
        className="task-search-input"
      />
      <span className="task-search-icon">&#128269;</span> {/* Ícone de lupa */}
    </div>
  );
};

export default TaskSearchBar;