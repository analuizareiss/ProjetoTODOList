import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import "./App.css";
import "./services/api"

function App() {
  const {
    tasks,
    editingTask,
    setEditingTask,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleCompleteTask,
    handleArchiveTask,
  } = useTasks();

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      {/* Formulário de edição ou adição */}
      <TaskForm
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      {/* Lista de tarefas */}
      <TaskList
        tasks={tasks}
        onComplete={handleCompleteTask}
        onArchive={handleArchiveTask}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;