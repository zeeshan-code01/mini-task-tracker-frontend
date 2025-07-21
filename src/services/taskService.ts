import axios from "axios";

const API_BASE = "https://localhost:7196/api/tasks";

export const createTask = async (token: string, task: { title: string; description: string }) => {
  const response = await axios.post(API_BASE, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTasks = async (token: string) => {
  const response = await axios.get(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
