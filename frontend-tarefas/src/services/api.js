import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL =", API_URL);


export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
}

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const completeTask = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/complete`);
  return response.data;
};

export const archiveTask = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/archive`);
  return response.data;
};