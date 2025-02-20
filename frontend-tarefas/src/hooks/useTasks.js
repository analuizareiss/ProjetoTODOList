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
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await fetchTasks();
    setTasks(tasks);
  };

  const handleAddTask = async (description, end_date) => {
    const newTask = await apiAddTask({ description, end_date });
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (task) => {
    const updatedTask = await apiUpdateTask(task._id, task);
    setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    setEditingTask(null);
  };

  const handleDeleteTask = async (id) => {
    await apiDeleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleCompleteTask = async (id) => {
    const completedTask = await apiCompleteTask(id);
    setTasks(tasks.map((task) => (task._id === id ? completedTask : task)));
  };

  const handleArchiveTask = async (id) => {
    const archivedTask = await apiArchiveTask(id);
    setTasks(tasks.map((task) => (task._id === id ? archivedTask : task)));
  };

  return {
    tasks,
    editingTask,
    setEditingTask,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleCompleteTask,
    handleArchiveTask,
  };
};