import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Register user
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/api/auth/register`, userData);
  return res.data;
};

// Login user
export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/api/auth/login`, userData);
  return res.data;
};
