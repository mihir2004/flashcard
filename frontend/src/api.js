import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update this to your backend URL

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const fetchQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions`);
  return response.data;
};

export const addQuestion = async (question, answer, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/questions`,
    { question, answer },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateQuestion = async (id, question, answer, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/questions`,
    { id, question, answer },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteQuestion = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/questions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
