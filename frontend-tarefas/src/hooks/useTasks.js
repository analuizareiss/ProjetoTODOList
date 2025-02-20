import { useState, useEffect } from "react";
import {
  fetchTasks,
  addTask as apiAddTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  completeTask as apiCompleteTask,
  archiveTask as apiArchiveTask,
} from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]); // Todas as tarefas
  const [filteredTasks, setFilteredTasks] = useState([]); // Tarefas filtradas
  const [editingTask, setEditingTask] = useState(null);

  // Carrega as tarefas ao iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setFilteredTasks(data); // Inicialmente, exibe todas as tarefas
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    loadTasks();
  }, []);

  // Função para pesquisar tarefas
  const handleSearch = (searchTerm) => {
    const filtered = tasks.filter((task) =>
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered); 
  };

  // Função para adicionar uma tarefa
  const handleAddTask = async (description, end_date) => {
    try {
      const newTask = await apiAddTask({ description, end_date });
      setTasks([...tasks, newTask]);
      setFilteredTasks([...filteredTasks, newTask]); 
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // Função para atualizar uma tarefa
  const handleUpdateTask = async (task) => {
    try {
      const updatedTask = await apiUpdateTask(task._id, task);
      const updatedTasks = tasks.map((t) => (t._id === task._id ? updatedTask : t));
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); 
      setEditingTask(null);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // Função para deletar uma tarefa
  const handleDeleteTask = async (id) => {
    try {
      await apiDeleteTask(id);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // Função para completar uma tarefa
  const handleCompleteTask = async (id) => {
    try {
      const completedTask = await apiCompleteTask(id);
      const updatedTasks = tasks.map((task) => (task._id === id ? completedTask : task));
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); 
    } catch (error) {
      console.error("Erro ao completar tarefa:", error);
    }
  };

  // Função para arquivar uma tarefa
  const handleArchiveTask = async (id) => {
    try {
      const archivedTask = await apiArchiveTask(id);
      const updatedTasks = tasks.map((task) => (task._id === id ? archivedTask : task));
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); 
    } catch (error) {
      console.error("Erro ao arquivar tarefa:", error);
    }
  };

  return {
    tasks: filteredTasks, 
    editingTask,
    setEditingTask,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleCompleteTask,
    handleArchiveTask,
    handleSearch, 
  };
};